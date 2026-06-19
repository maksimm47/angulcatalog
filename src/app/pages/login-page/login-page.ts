import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string | null | undefined;

  constructor(private authService: AuthService, private router: Router){}

  onClickLogin(){
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => this.errorMessage = err.message
    });
  }
}
