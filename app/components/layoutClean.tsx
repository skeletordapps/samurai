import Head from "next/head";
import { Roboto } from "next/font/google";
import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";

import Nav from "./nav";
import Footer from "./footer";
import BottomNav from "./bottomNav";

import "react-toastify/dist/ReactToastify.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "900"],
});

interface layout {
  children: ReactElement | ReactElement[];
}

export default function LayoutClean({ children }: layout) {
  return (
    <>
      <Head>
        <title>Samurai Starter</title>
        <meta
          name="description"
          content="Samurai enables projects to raise capital on a decentralised, permissionless and interoperable environment"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer
        containerId="toast-notification"
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <main className={roboto.className}>
        <div className="flex flex-col w-full h-full items-center">
          <div className="flex flex-col jutify-between w-full  h-full relative text-white/90 mb-12 lg:mb-0">
            <Nav />
            {children}
            <Footer />
          </div>
          <BottomNav />
        </div>
      </main>
    </>
  );
}
