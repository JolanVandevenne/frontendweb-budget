// tests/fixtures/transactions.ts
export const mockGetAllTransactions = {
  items: [
    {
      id: 1,
      amount: 97,
      date: '2025-10-01',
      user: { id: 2, name: 'Pieter' },
      place: { id: 4, name: 'Chinees Restaurant' },
    },
    {
      id: 2,
      amount: 100,
      date: '2025-10-01',
      user: { id: 2, name: 'Pieter' },
      place: { id: 3, name: 'Irish Pub' },
    },
  ],
  page: 1,
  pageSize: 10,
  total: 2,
};
