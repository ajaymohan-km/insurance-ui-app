import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerDashboardService } from '../services/customer-dashboard.service';

@Component({
  selector: 'app-plan-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  planDetails: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private dashboardService: CustomerDashboardService
  ) {}

  ngOnInit(): void {
    const planId = this.route.snapshot.paramMap.get('id');
    if (planId) {
      this.dashboardService.getPlanDetails(planId).subscribe({
        next: (data) => {
          this.planDetails = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading plan details:', error);
          this.loading = false;
        }
      });
    }
  }
}
