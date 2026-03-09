import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, ILoginRequest } from '../models/user.model';
import { IBusiness, IProductionReport, ICountryRanking, BusinessType } from '../models/business.model';
import { ICountry } from '../models/country.model';
import { IRegion } from '../models/region.model';

const API_BASE = 'http://localhost:8080/api';

/* ──────────────────────────────────────────────
   User Service
   ────────────────────────────────────────────── */
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE}/users`;

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }

  getById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`);
  }

  create(user: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(this.url, user);
  }

  update(id: number, user: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/${id}`, user);
  }

  login(credentials: ILoginRequest): Observable<string> {
    return this.http.post(`${this.url}/login`, credentials, { responseType: 'text' });
  }
}

/* ──────────────────────────────────────────────
   Business Service
   ────────────────────────────────────────────── */
@Injectable({ providedIn: 'root' })
export class BusinessService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE}/businesses`;

  getAll(): Observable<IBusiness[]> {
    return this.http.get<IBusiness[]>(this.url);
  }

  getById(id: number): Observable<IBusiness> {
    return this.http.get<IBusiness>(`${this.url}/${id}`);
  }

  createForUser(userId: number, business: Partial<IBusiness>): Observable<IBusiness> {
    return this.http.post<IBusiness>(`${this.url}/user/${userId}`, business);
  }

  update(id: number, business: Partial<IBusiness>): Observable<IBusiness> {
    return this.http.put<IBusiness>(`${this.url}/${id}`, business);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getProductionReport(): Observable<IProductionReport[]> {
    return this.http.get<IProductionReport[]>(`${this.url}/report`);
  }

  getRegionPercentages(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.url}/report/percentage`);
  }

  getTop10Countries(): Observable<ICountryRanking[]> {
    return this.http.get<ICountryRanking[]>(`${this.url}/report/top-countries`);
  }

  search(params: {
    type?: BusinessType;
    regionId?: number;
    countryId?: number;
    userId?: number;
  }): Observable<IBusiness[]> {
    const httpParams: Record<string, string> = {};
    if (params.type) httpParams['type'] = params.type;
    if (params.regionId) httpParams['regionId'] = String(params.regionId);
    if (params.countryId) httpParams['countryId'] = String(params.countryId);
    if (params.userId) httpParams['userId'] = String(params.userId);
    return this.http.get<IBusiness[]>(`${this.url}/search`, { params: httpParams });
  }
}

/* ──────────────────────────────────────────────
   Country Service
   ────────────────────────────────────────────── */
@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE}/country`;

  getAll(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.url);
  }

  getById(id: number): Observable<ICountry> {
    return this.http.get<ICountry>(`${this.url}/${id}`);
  }

  create(country: Partial<ICountry>): Observable<ICountry> {
    return this.http.post<ICountry>(this.url, country);
  }
}

/* ──────────────────────────────────────────────
   Region Service
   ────────────────────────────────────────────── */
@Injectable({ providedIn: 'root' })
export class RegionService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_BASE}/region`;

  getAll(): Observable<IRegion[]> {
    return this.http.get<IRegion[]>(this.url);
  }

  getById(id: number): Observable<IRegion> {
    return this.http.get<IRegion>(`${this.url}/${id}`);
  }

  getByCountry(countryId: number): Observable<IRegion[]> {
    return this.http.get<IRegion[]>(`${this.url}/country/${countryId}`);
  }

  create(region: Partial<IRegion>): Observable<IRegion> {
    return this.http.post<IRegion>(this.url, region);
  }
}
