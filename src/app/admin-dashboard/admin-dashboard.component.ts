import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  applications: any[] = [];
  providers: any[] = [];
  loading = true;
  adminName = localStorage.getItem('username') || 'Admin';

  constructor(
    private adminService: AdminDashboardService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    Promise.all([
      this.adminService.getPendingApplications().toPromise(),
      this.adminService.getServiceProviders().toPromise()
    ]).then(([applications, providers]) => {
      this.applications = applications;
      this.providers = providers;
      this.loading = false;
    }).catch(error => {
      console.error('Error loading dashboard data:', error);
      this.loading = false;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  approveApplication(applicationId: string): void {
    this.adminService.approveApplication(applicationId).subscribe({
        next: () => {
            this.loadDashboardData();
            this.toastr.success('Application approved successfully');
        },
        error: (error) => {
            console.error('Error approving application:', error);
            this.toastr.error('Failed to approve application');
        }
    });
}

rejectApplication(applicationId: string): void {
    this.adminService.rejectApplication(applicationId).subscribe({
        next: () => {
            this.loadDashboardData();
            this.toastr.success('Application rejected successfully');
        },
        error: (error) => {
            console.error('Error rejecting application:', error);
            this.toastr.error('Failed to reject application');
        }
    });
}
toggleProviderStatus(provider: any): void {
  const action = provider.enabled ? 
      this.adminService.disableProvider(provider.id) : 
      this.adminService.enableProvider(provider.id);

  action.subscribe({
      next: () => {
          this.loadDashboardData();
          const message = provider.enabled ? 'Provider disabled' : 'Provider enabled';
          this.toastr.success(message);
      },
      error: (error) => {
          console.error('Error updating provider status:', error);
          this.toastr.error('Failed to update provider status');
      }
  });
}


}
