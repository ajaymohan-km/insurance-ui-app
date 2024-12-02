import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerDashboardService } from '../services/customer-dashboard.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policies: any[] = [];
  loading = true;
  showClaimModal = false;
  selectedPolicy: any = null;
  claimData = {
    description: '',
    amount: 0
  };

  constructor(
    private dashboardService: CustomerDashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.dashboardService.getPolicies().subscribe({
      next: (data) => {
        this.policies = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading policies:', error);
        this.loading = false;
      }
    });
  }

  openClaimModal(policy: any): void {
    this.selectedPolicy = policy;
    this.showClaimModal = true;
  }

  closeClaimModal(): void {
    this.showClaimModal = false;
    this.selectedPolicy = null;
    this.claimData = {
      description: '',
      amount: 0
    };
  }

  submitClaim(): void {
    const claimRequest = {
      policyId: this.selectedPolicy.id,
      serviceProviderId: this.selectedPolicy.serviceProviderId,
      ...this.claimData
    };

    this.dashboardService.submitClaim(claimRequest).subscribe({
      next: () => {
        this.toastr.success('Claim submitted successfully!');
        this.closeClaimModal();
      },
      error: (error) => {
        this.toastr.error('Failed to submit claim');
        console.error('Error submitting claim:', error);
      }
    });
  }
}
