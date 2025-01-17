import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const isActive = (paths) => paths.includes(router.pathname);
  
    return (
      <header className="header">
        <div className="header-logo">
          <Link href="/app" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
            <img src="/assets/goldentech.png" alt="GoldenTech Logo" />
          </Link>
          <Link href="/app" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
          <span className="header-title">GoldenTech</span>

          </Link>
        </div>
        <nav className="header-nav">
          <Link href="/diagnosticos" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
            <span className={router.pathname === '/diagnosticos' ? 'active' : ''}>Diagnosticos</span>
          </Link>
          <Link href="/citas" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
          <span className={isActive(['/citas', '/agenda']) ? 'active' : ''}>Citas</span>
          </Link>
          <span>Perfil</span>
        </nav>
      </header>
    );
  }