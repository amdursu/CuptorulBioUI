// import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/NavBar/NavBar";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Cuptorul Bio</title>
        <meta name="description" content="Cuptorul Bio UI" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
    </>
  );
}

export default MyApp;
