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