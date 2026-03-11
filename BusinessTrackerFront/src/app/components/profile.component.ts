import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (auth.isLoading$ | async) {
      <div class="profile-loading">
        <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
        <span>Cargando perfil...</span>
      </div>
    }

    @if ((auth.isAuthenticated$ | async) && (auth.user$ | async); as user) {
      <div class="profile-container">
        <div class="avatar-wrapper">
          @if (user.picture) {
            <img [src]="user.picture" [alt]="user.name || 'User'" class="avatar-img" />
          } @else {
            <div class="avatar-placeholder">
              {{ getInitials(user.name || user.email || 'U') }}
            </div>
          }
          <div class="avatar-status-dot"></div>
        </div>

        <div class="profile-info">
          <h4 class="profile-name">{{ user.name || 'Usuario' }}</h4>
          <p class="profile-email">{{ user.email }}</p>
        </div>

        @if (user.email_verified !== undefined) {
          <div class="profile-meta">
            <span class="meta-badge" [class.verified]="user.email_verified" [class.pending]="!user.email_verified">
              {{ user.email_verified ? '✅ Email verificado' : '⏳ Verificación pendiente' }}
            </span>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .profile-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 2rem;
      color: var(--color-text-muted, #7F8C8D);
    }

    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
    }

    .avatar-wrapper {
      position: relative;
    }

    .avatar-img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--color-accent, #1ABC9C);
      box-shadow: 0 4px 15px rgba(26, 188, 156, 0.25);
      transition: transform 0.3s ease;
    }

    .avatar-img:hover {
      transform: scale(1.05);
    }

    .avatar-placeholder {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-accent, #1ABC9C), var(--color-secondary, #3498DB));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
      box-shadow: 0 4px 15px rgba(26, 188, 156, 0.3);
    }

    .avatar-status-dot {
      position: absolute;
      bottom: 4px;
      right: 4px;
      width: 16px;
      height: 16px;
      background: var(--color-success, #27AE60);
      border-radius: 50%;
      border: 3px solid var(--color-bg-card, #fff);
      box-shadow: 0 2px 6px rgba(39, 174, 96, 0.4);
    }

    .profile-info {
      text-align: center;
    }

    .profile-name {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--color-primary, #2C3E50);
      margin: 0 0 0.25rem;
    }

    .profile-email {
      font-size: 0.95rem;
      color: var(--color-text-muted, #7F8C8D);
      margin: 0;
    }

    .profile-meta {
      margin-top: 0.5rem;
    }

    .meta-badge {
      font-size: 0.85rem;
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      font-weight: 500;
    }

    .meta-badge.verified {
      background-color: rgba(39, 174, 96, 0.1);
      color: var(--color-success, #27AE60);
    }

    .meta-badge.pending {
      background-color: rgba(243, 156, 18, 0.1);
      color: var(--color-warning, #F39C12);
    }
  `]
})
export class ProfileComponent {
  protected auth = inject(AuthService);

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
