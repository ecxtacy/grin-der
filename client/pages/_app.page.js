import "../styles/globals.css";
import { useEffect, useState } from "react";
import { BreakpointProvider } from "react-socks";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import ScrollButton from "../components/basic/MoveToTop";

function addProductJsonLd() {
  return {
    __html: {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.Grinder.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Internships",
          item: "https://Grinder.com/internships",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "About",
          item: "https://Grinder.com/about",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Contact",
          item: "https://Grinder.com/contact",
        },
      ],
    },
  };
}
function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(true);
  useEffect(() => {
    setShowChild(true);
    setTimeout(() => {
      setPreloaderActive(false);
    }, 1400);
  }, []);
  if (!showChild) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Grinder | Tinder for Grinders</title>
        <meta name="title" content="Grinder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconn.png" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="canonical" href="https://Grinder.com/" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Emupedia"
          href="https://Grinder.com/feed.xml"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.js"
        ></script>
        {/* <script src="https://accounts.google.com/gsi/client" async defer ></script> */}
      </Head>

      {preloaderActive && (
        <div className="preloader-container">
          <div className="loaderBackground"></div>
          <div id="preloader-active" style={{ transition: "all 0.5s" }}>
            <div className="preloader d-flex align-items-center justify-content-center">
              <div className="tw-flex tw-items-center tw-justify-center position-relative">
                <div
                  className="preloader-circle"
                  style={{ transform: "translateX(-15%) translateY(-55%)" }}
                ></div>
                <div
                  className="preloader-img pere-text"
                  style={{ transform: "translateX(-15%) translateY(-55%)" }}
                >
                  <img src="/logo1Big.png" alt="loader" height={100} width={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BreakpointProvider>
        <AuthProvider>
          <ScrollButton />
          <Component {...pageProps} />
        </AuthProvider>
      </BreakpointProvider>
    </>
  );
}

export default MyApp;
