import { Link } from 'react-router';

function App() {
  return (
    <div className='bg-white text-gray-900 m-3'>
      <h1>My Budget App</h1>
      <p>Choose one of the following links:</p>
      <ul>
        <li>
          <Link to='/transactions' className='text-blue-600 underline'>
            Transactions
          </Link>
        </li>
        <li>
          <Link to='/places' className='text-blue-600 underline'>
            Places
          </Link>
        </li>
        <li>
          <Link to='/about' className='text-blue-600 underline'>
            About us
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default App;