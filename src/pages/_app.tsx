import '../styles/globals.css'
import '@material-tailwind/react/tailwind.css'
import Head from 'next/head'
import Link from 'next/link'
import { ProvideAuth } from '../lib/context/useAuth'
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }) {
    return (
        <ProvideAuth>
            <Layout>
                <div className="grid wrapper">
                    <Component {...pageProps} />
                </div>
            </Layout>
        </ProvideAuth>
    )
}

export default MyApp
