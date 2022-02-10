import React, { useState } from 'react'
import Head from 'next/head'
import { NavBar, NavItem, NavItems, NavLogo } from '../components/navbar'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { route } = useRouter()
    console.log(route)
    return (
        <div>
            <Head>
                <title>Blackjack</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                {/* <!-- Primary Meta Tags --> */}
                <meta name="title" content="Blackjack" />
                <meta name="description" content="A single page, responsive blackjack game." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://blackjack.jesse-moore.com" />
                <meta property="og:title" content="Blackjack" />
                <meta property="og:description" content="A single page, responsive blackjack game." />
                <meta
                    property="og:image"
                    content="https://cdn10t9c8mk6fd86gh2u8.s3.amazonaws.com/blackjack_screen.png"
                />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://blackjack.jesse-moore.com" />
                <meta property="twitter:title" content="Blackjack" />
                <meta property="twitter:description" content="A single page, responsive blackjack game." />
                <meta
                    property="twitter:image"
                    content="https://cdn10t9c8mk6fd86gh2u8.s3.amazonaws.com/blackjack_screen.png"
                />
            </Head>
            <NavBar>
                <Link href="/" passHref>
                    <NavLogo>Logo</NavLogo>
                </Link>
                <NavItems>
                    <Link href="/admin" passHref>
                        <NavItem active={route === '/admin'}>Admin</NavItem>
                    </Link>
                    <Link href="/standings" passHref>
                        <NavItem active={route === '/standings'}>Standings</NavItem>
                    </Link>
                    <Link href="/profile" passHref>
                        <NavItem active={route === '/profile'}>Profile</NavItem>
                    </Link>
                </NavItems>
            </NavBar>
            <div className="w-full max-w-5xl mx-auto px-4">{children}</div>
        </div>
    )
}
