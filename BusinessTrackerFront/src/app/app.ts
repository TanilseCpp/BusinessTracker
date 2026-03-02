import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Users } from './pages/users/users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Users],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'BusinessTrackerFront';
}
