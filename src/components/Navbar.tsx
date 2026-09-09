import { NavLink, Link, useLocation } from 'react-router';
import { useState } from 'react';
import { PiggyBankIcon, Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const links = [
  { to: '/transactions', label: 'Transactions' },
  { to: '/places', label: 'Places' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='container mx-auto flex h-14 max-w-5xl items-center px-4'>
        <Link
          to='/transactions'
          className='flex items-center gap-2 font-semibold text-primary mr-6'
        >
          <PiggyBankIcon className='size-5' />
          Budget
        </Link>

        {/* Desktop nav */}
        <div className='hidden md:flex flex-1'>
          <NavigationMenu>
            <NavigationMenuList>
              {links.map(({ to, label }) => (
                <NavigationMenuItem key={to}>
                  <NavigationMenuLink
                    render={<NavLink to={to} />}
                    active={pathname === to || pathname.startsWith(to + '/')}
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile toggle */}
        <button
          className='ml-auto md:hidden'
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label='Toggle menu'
        >
          {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='border-t md:hidden bg-background'>
          <div className='container mx-auto px-4 py-4 max-w-5xl'>
            <NavigationMenu>
              <NavigationMenuList className='flex-col items-start'>
                {links.map(({ to, label }) => (
                  <NavigationMenuItem key={to}>
                    <NavigationMenuLink render={<Link to={to} />}>
                      {label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </header>
  );
}
