import { memo, ReactNode, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants/routes';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = memo(({ children }: ILayoutProps) => {
  const location = useLocation();
  const isHome = useMemo(() => location.pathname === ROUTES.HOME, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to={ROUTES.HOME} className="text-xl font-medium text-foreground hover:text-primary transition-colors">
            Google Forms Lite
          </Link>
          {!isHome && (
            <Link
              to={ROUTES.HOME}
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Back to Forms
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-6 max-w-7xl">{children}</main>
    </div>
  );
});

Layout.displayName = 'Layout';
