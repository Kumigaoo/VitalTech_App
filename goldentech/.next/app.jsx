import Footer from '../src/components/footer/Footer'
import Header from '../src/components/header/header'
import Main from '../pages/main'
import axios from 'axios';

export default function App() {
    return (
        <>
            <Header/>
            <Main />
            <Footer/>
        </>        
    );
}