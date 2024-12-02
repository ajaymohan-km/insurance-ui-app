import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderDashboardService } from '../services/provider-dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  consultations: any[] = [];
  claims: any[] = [];
  loading = true;
  providerName = localStorage.getItem('username') || 'Provider';

  constructor(private providerService: ProviderDashboardService,private toastr: ToastrService,  private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    Promise.all([
      this.providerService.getProviderConsultations().toPromise(),
      this.providerService.getProviderClaims().toPromise()
    ]).then(([consultations, claims]) => {
      this.consultations = consultations;
      this.claims = claims;
      this.loading = false;
    }).catch(error => {
      console.error('Error loading dashboard data:', error);
      this.loading = false;
    });
  }
  completeConsultation(consultationId: string): void {
    this.providerService.completeConsultation(consultationId).subscribe({
        next: () => {
            this.loadDashboardData();
            this.toastr.success('Consultation marked as complete');
        },
        error: (error) => {
            console.error('Error completing consultation:', error);
            this.toastr.error('Failed to complete consultation');
        }
    });
}

approveClaim(claimId: string): void {
  this.providerService.approveClaim(claimId).subscribe({
      next: () => {
          this.loadDashboardData();
          this.toastr.success('Claim approved successfully');
      },
      error: (error) => {
          console.error('Error approving claim:', error);
          this.toastr.error('Failed to approve claim');
      }
  });
}

rejectClaim(claimId: string): void {
  this.providerService.rejectClaim(claimId).subscribe({
      next: () => {
          this.loadDashboardData();
          this.toastr.success('Claim rejected successfully');
      },
      error: (error) => {
          console.error('Error rejecting claim:', error);
          this.toastr.error('Failed to reject claim');
      }
  });
}
logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}


}
