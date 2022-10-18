import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from '@prismicio/next'
import { SessionProvider } from "next-auth/react"

import { repositoryName } from "../services/prismic";

import { AppProps } from 'next/app';
import Link from "next/link";

import { Header } from '../components/Header';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrismicProvider
      internalLinkComponent={({ href, ...props }) => (
        <Link href={href}>
          <a {...props} />
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>   
        <SessionProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </PrismicPreview>
    </PrismicProvider>
  )
}

export default MyApp
