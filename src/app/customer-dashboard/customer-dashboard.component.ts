import { Component, OnInit } from '@angular/core';
import { CustomerDashboardService } from '../services/customer-dashboard.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface DashboardData {
  policies: any[];
  claims: any[];
  applications: any[];
}

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  dashboardData: DashboardData = {
    policies: [],
    claims: [],
    applications: []
  };

  loading = true;
  username = localStorage.getItem('username') || 'User';

  constructor(private dashboardService: CustomerDashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    console.log('Token:', localStorage.getItem('token')); // Add this line
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        console.log('Dashboard data received:', data); // Add this line
        this.dashboardData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error); // Enhanced error logging
        this.loading = false;
      }
    });
  }

  getActivePoliciesCount(): number {
    return this.dashboardData.policies.filter(policy => policy.status === 'ACTIVE').length;
  }

  getPendingApplicationsCount(): number {
    return this.dashboardData.applications.filter(app => app.status === 'SUBMITTED').length;
  }

  getPendingClaimsCount(): number {
    return this.dashboardData.claims.filter(claim => claim.status === 'SUBMITTED').length;
  }

  viewPlanDetails(applicationId: string): void {
    this.router.navigate(['/plan-details', applicationId]);
  }
}
