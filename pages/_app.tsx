// pages/_app.tsx
import type { AppProps } from "next/app";
import Script from "next/script";

// Import semua CSS lainnya
import "../styles/navbar.css";
import "../styles/modal.css";
import "../styles/calonpasangan.css";
import "../styles/weadingloaction.css";
import "../styles/maps.css";
import "../styles/footer.css";
import "../styles/comment.css";
import "../styles/untilities.css";
import "../styles/mainbanner.css";
import "../styles/lovestory.css";
import "../styles/adapwalimah.css";
import "../styles/amplop.css";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Masukkan Script Bootstrap pakai next/script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
