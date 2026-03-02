import { ICountry } from './country.model';

export interface IRegion {
  id: number;
  name: string;
  country: ICountry;
}
