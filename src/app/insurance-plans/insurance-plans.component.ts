import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardService } from '../services/customer-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insurance-plans.component.html',
  styleUrls: ['./insurance-plans.component.css']
})
export class InsurancePlansComponent implements OnInit {
  plans: any[] = [];
  loading = true;

  constructor(private dashboardService: CustomerDashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.dashboardService.getAllPlans().subscribe({
      next: (data) => {
        this.plans = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading plans:', error);
        this.loading = false;
      }
    });
  }

  selectPlan(planId: string): void {
    this.router.navigate(['/plan-selection', planId]);
  }
}
