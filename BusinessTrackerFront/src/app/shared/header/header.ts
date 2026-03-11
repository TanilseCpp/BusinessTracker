import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../../components/login-button.component';
import { LogoutButtonComponent } from '../../components/logout-button.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, LoginButtonComponent, LogoutButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly auth = inject(AuthService);
  readonly activeRoute = signal('home');

  setActive(route: string): void {
    this.activeRoute.set(route);
  }
}
