import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth';
import { CartService } from '../../data/cart.service';
import { FavoritesService } from '../../data/favorites.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public favoritesService: FavoritesService
  ) {}

  onLogout(){
    this.authService.logout()
  }
}
