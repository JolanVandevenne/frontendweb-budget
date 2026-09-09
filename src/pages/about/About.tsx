import { Link, Outlet } from 'react-router';

const About = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>About</h1>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">
        This website gives you a clear and friendly way to keep track of your
        budget. Browse your transactions, explore your favorite places, and
        manage your financial overview in one simple space designed to make
        everyday budgeting feel more organized.
      </p>
      <ul className='p-4 mb-4'>
        <li>
          <Link to='/about/services' className='text-blue-600 underline'>
            Services
          </Link>
        </li>
        <li>
          <Link to='/about/history' className='text-blue-600 underline'>
            History
          </Link>
        </li>
        <li>
           <Link to='/about/location' className='text-blue-600 underline'>
            Location
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default About;

export const Services = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Services</h1>
      <p className='text-muted-foreground leading-relaxed max-w-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        posuere erat a ante venenatis dapibus posuere velit aliquet.
      </p>
    </>
  );
};

export const History = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>History</h1>
      <p className='text-muted-foreground leading-relaxed max-w-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis
        consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed
        consectetur.
      </p>
    </>
  );
};

export const Location = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Location</h1>
      <p className='text-muted-foreground leading-relaxed max-w-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio
        dui. Maecenas faucibus mollis interdum. Nullam id dolor id nibh
        ultricies vehicula ut id elit.
      </p>
    </>
  );
};
