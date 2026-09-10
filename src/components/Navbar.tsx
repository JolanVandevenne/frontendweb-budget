// src/components/Navbar.tsx
import { Link, NavLink, useLocation } from 'react-router';
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useTheme } from '../contexts/theme';
import { PiggyBankIcon, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const links = [
  { to: '/transactions', label: 'Transactions' },
  { to: '/places', label: 'Places' },
  { to: '/about', label: 'About' },
];

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleTheme}
      aria-label='Toggle theme'
    >
      {isDark ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
    </Button>
  );
};

function NavMenu({ vertical = false }: { vertical?: boolean }) {
  const { pathname } = useLocation();
  return (
    <NavigationMenu>
      <NavigationMenuList
        className={vertical ? 'flex-col items-start' : undefined}
      >
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
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-5xl items-center px-4">
        <Link
          to="/transactions"
          className="flex items-center gap-2 font-semibold text-primary mr-6"
        >
          <PiggyBankIcon className="size-5" />
          Budget
        </Link>

        <div className="hidden md:flex flex-1">
          <NavMenu />
        </div>
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <ThemeToggle />
        </div>

        <button
          className="ml-auto md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t md:hidden bg-background">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <NavMenu vertical />
            <div className="flex items-center gap-2 pt-2 border-t w-full">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
