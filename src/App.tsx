
import {TRANSACTION_DATA} from './api/mock_data';
import PlacesList from './components/places/PlacesList';
import Transaction from './components/transactions/Transaction';
import type { Transaction as TransactionType } from './types';

function App() {
  return (
    <div className='bg-white text-gray-900'>
      <h1 className='text-2xl font-bold text-center mb-4'>
        Mijn Budget App
      </h1>
      {TRANSACTION_DATA.map((trans: TransactionType) => (
        <Transaction key={trans.id} {...trans} />
      ))
      }
      <PlacesList />
    </div >
  );
}

export default App;