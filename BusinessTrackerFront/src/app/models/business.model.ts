export enum BusinessType {
  RESTAURANT = 'RESTAURANT',
  STORE = 'STORE',
  SERVICE = 'SERVICE',
  ONLINE = 'ONLINE',
  TECNOLOGY = 'TECNOLOGY',
  OTHER = 'OTHER',
}

export interface IBusiness {
  id: number;
  businessName: string;
  email: string;
  annualIncome: number | null;
  initialInvestment?: number;
  profit: number;
  roi: number;
  type: BusinessType;
  user: {
    id: number;
    username: string;
    email: string;
  };
  region: {
    id: number;
    name: string;
    country: {
      id: number;
      name: string;
    };
  };
}

export interface IProductionReport {
  region: string;
  type: BusinessType;
  totalUsers: number;
}

export interface ICountryRanking {
  country: string;
  totalBusinesses: number;
}
