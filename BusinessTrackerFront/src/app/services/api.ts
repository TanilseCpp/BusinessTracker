import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private _http = inject(HttpClient);
  private urlBase = "http://localhost:8080/api/users";

  getUsers(): Observable<any> {
    return this._http.get<any>(this.urlBase);
  }


}
