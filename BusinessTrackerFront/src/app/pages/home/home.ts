import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BusinessService } from '../../services/api';
import { IBusiness } from '../../models/business.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly businessService = inject(BusinessService);

  readonly recentBusinesses = signal<IBusiness[]>([]);
  readonly totalBusinesses = signal(0);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.businessService.getAll().subscribe({
      next: (businesses) => {
        this.totalBusinesses.set(businesses.length);
        this.recentBusinesses.set(businesses.slice(0, 6));
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
