export interface User {
  id: number;
  name: string;
}

export interface Place {
  id: number;
  name: string;
  rating: number;
}

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  user: User;
  place: Place;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pageSize: number;
  page: number;
}