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
  expenses: number;
  income: number;
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
