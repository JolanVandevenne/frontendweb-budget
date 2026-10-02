// src/api/mock_data.ts
import type { Place, Transaction } from '../types';

export const PLACE_DATA: Place[] = [
  {
    id: 1,
    name: 'Loon',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dranken Geers',
    rating: 3,
  },
  {
    id: 3,
    name: 'De Oude Markt',
    rating: 4,
  },
];

export const TRANSACTION_DATA: Transaction[] = [
  {
    id: 1,
    amount: 3500,
    date: '2026-05-25T17:40:00.000Z',
    place: {
      id: 1,
      name: 'Loon',
      rating: 5,
    },
    user: {
      id: 1,
      name: 'Karine Samyn',
    },
  },
  {
    id: 2,
    amount: 220,
    date: '2026-05-08T18:00:00.000Z',
    place: {
      id: 2,
      name: 'Dranken Geers',
      rating: 3,
    },
    user: {
      id: 2,
      name: 'Thomas Aelbrecht',
    },
  },
];
