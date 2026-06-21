import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  name: string = ''
  email: string = ''
  password: string = ''
  errorMessage: string | null | undefined

  constructor(private authService: AuthService, private route: Router){}

  onClickRegister(){
    this.authService.register(this.email, this.password, this.name).subscribe({
      next: () => this.route.navigate(['']),
      error: (err) => this.errorMessage = err.message
    })
  }
}
