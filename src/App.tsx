
import PlacesList from './pages/places/PlacesList';
import TransactionList from './pages/transactions/TransactionList';


function App() {
  return (
    <div className='bg-white text-gray-900'>
      <h1 className='text-2xl font-bold text-center mb-4'>
        Mijn Budget App
      </h1>
      <TransactionList />
      <PlacesList />
    </div >
  );
}

export default App;