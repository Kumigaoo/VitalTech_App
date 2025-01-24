import App from 'next/app'
import '../src/styles.css' // Importa el archivo de estilos
 
export default function Myapp({ Component, pageProps, example }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
 
Myapp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx, example: 'data' }
}