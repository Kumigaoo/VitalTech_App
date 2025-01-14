import MainContent from "./pages/inicio/MainContent";
import Footer from './pages/shared/footer/Footer'
import Header from './pages/shared/header/header';
import Diagnosticos from "./pages/diagnosticos/Diagnosticos"

export default function App() {
    return (
        <>
            <Header/>
            <MainContent />
            <Diagnosticos />
            <Footer/>
        </>
          
    );
}