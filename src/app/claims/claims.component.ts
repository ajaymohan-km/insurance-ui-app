import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerDashboardService } from '../services/customer-dashboard.service';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims: any[] = [];
  loading = true;

  constructor(private dashboardService: CustomerDashboardService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.dashboardService.getClaims().subscribe({
      next: (data) => {
        this.claims = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading claims:', error);
        this.loading = false;
      }
    });
  }
}
