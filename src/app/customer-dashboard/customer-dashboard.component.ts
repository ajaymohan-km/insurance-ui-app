import { Component, OnInit } from '@angular/core';
import { CustomerDashboardService } from '../services/customer-dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  dashboardData: any = {
    totalActivePolicies: 0,
    totalPendingClaims: 0,
    totalRevenue: 0,
    userGrowth: null,
    recentTransactions: []
  };

  loading = true;

  constructor(private dashboardService: CustomerDashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.loading = false;
      }
    });
  }
}