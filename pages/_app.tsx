import '../src/css/styles.css'
import MainLayout from '../src/layout/main'


// @ts-ignore
export default function MyApp({ Component, pageProps }) {
  return <MainLayout><Component {...pageProps} /></MainLayout>
}