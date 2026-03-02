import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/api';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getAll().subscribe((users: IUser[]) => {
      console.log('users:', users);
    });
  }
}
