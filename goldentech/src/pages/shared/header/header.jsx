
export default function Header() {
    return (
      <header className="header">
        <div className="header-logo">
          <img src="/assets/goldentech.png" alt="GoldenTech Logo" />
          <span className="header-title">GoldenTech</span>
        </div>
        <nav className="header-nav">
          <span>Consultas</span>
          <span>Citas</span>
          <span>Perfil</span>
        </nav>
      </header>
    );
  }