import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="dashboard-container">
      <aside class="sidebar">
        <div class="brand">
          <span class="logo">🛡️</span>
          <h2>Insurance Hub</h2>
        </div>
        <nav class="nav-menu">
          <a class="nav-item" routerLink="/dashboard">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
          </a>
          <a class="nav-item" routerLink="/plans">
            <i class="fas fa-file-alt"></i>
            <span>View All Plans</span>
          </a>
          <a class="nav-item" routerLink="/consultations">
            <i class="fas fa-calendar-check"></i>
            <span>Consultations</span>
          </a>
          <a class="nav-item" routerLink="/policies">
            <i class="fas fa-file-contract"></i>
            <span>My Policies</span>
          </a>
          <a class="nav-item" routerLink="/claims">
            <i class="fas fa-clipboard-list"></i>
            <span>Claims</span>
          </a>
          
        </nav>
        <div class="logout-section">
          <button class="logout-button" (click)="logout()">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
      </div>
      </aside>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
    styleUrls: ['../../customer-dashboard/customer-dashboard.component.css']

})
export class MainLayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
