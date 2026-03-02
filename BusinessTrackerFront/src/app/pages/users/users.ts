import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

    private _apiService = inject(Api);

  ngOnInit(): void {
    this._apiService.getUsers().subscribe(users => {
      console.log('users:', users);
    });
  }



  getUsers() {
    console.log('Getting users...');
  }

}
