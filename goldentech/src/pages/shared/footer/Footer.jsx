

export default function Footer() {
  console.log("Footer is rendering");
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/assets/goldentech.png" alt="GoldenTech Logo" />
        </div>
        <div className="footer-contact">
          <h4>Contáctanos</h4>
          <p>
            Email: consultas@goldentech.com
            
          </p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 GoldenTech by JotaJohnSons Team. Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
