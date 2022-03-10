import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ProvideAuth } from '../lib/context/useAuth'
import { ProvideSpinner } from '../lib/context/useSpinner'
import { Layout } from '../components/common/Layout'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <ProvideAuth>
            <ProvideSpinner>
                <Layout>
                    {getLayout(
                        <div className="grid wrapper">
                            <Component {...pageProps} />
                        </div>
                    )}
                </Layout>
            </ProvideSpinner>
        </ProvideAuth>
    )
}
