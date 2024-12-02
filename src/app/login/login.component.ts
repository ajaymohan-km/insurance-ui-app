import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
    ).subscribe({
        next: (response) => {
            if (response.role === 'ADMIN') {
                this.router.navigate(['/admin-dashboard']);
            } else if (response.role === 'SERVICE_PROVIDER') {
                this.router.navigate(['/provider-dashboard']);
            } else {
                this.router.navigate(['/dashboard']);
            }
        },
        error: error => {
            this.error = 'Invalid credentials';
            this.loading = false;
        }
    });
}


}