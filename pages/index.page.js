import {
  About,
  Internship,
  MentorSection,
  Service,
  Testimonial,
  Banner,
} from "../components/homePage";
import Hackathon from "../components/hackthons/Hackathons";
import internshipsData from "./data/coursesData";
import servicesData from "./data/ServicesData";
import hackathonsData from "./data/hackathonsData";
import testiomialsData from "./data/testiomialsData";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ButtonLink, Section } from "../components/UI";
import { useAuth } from "../context/AuthContext";
import { encryptData, decryptData } from "../hook/encryptDecrypt";
var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
const OwlCarousel = dynamic(import("react-owl-carousel"), {
  ssr: false,
});

import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import hackathonStyle from "../styles/hackathon.module.css";
import { useState, useEffect } from "react";

const internshipsOptions = {
  margin: 40,
  items: 3,
  nav: true,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    880: {
      items: 2,
    },
    1170: {
      items: 3,
    },
  },
};

const testimonialOptions = {
  margin: 40,
  items: 4,
  nav: true,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    900: {
      items: 2,
    },
    1170: {
      items: 3,
    },
  },
};

export default function Home() {
  const [carousel, setCarousel] = useState(false);
  const hasPlayedGreeting = localStorage.getItem("has_played_greeting");
  useEffect(() => {
    setCarousel(true);
  }, [carousel]);

  const {
    isMentorLoggedIn,
    setIsMentorLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn,
  } = useAuth();
  // console.log(isMentorLoggedIn,isUserLoggedIn);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const mentorData = JSON.parse(localStorage.getItem("mentorData"));
  return (
    <div>
      {(localStorage.getItem("mentorData") !== null ||
        localStorage.getItem("userData") !== null) &&
      !hasPlayedGreeting ? (
        <div className="welcomeAfterLoggedIn">
          Hi 👋🏻 {userData?.user_name || mentorData?.mentor_name} <br /> Welcome
          to Grinder
          <audio
            src="/assets/sound/greet.wav"
            autoplay
            onLoadedData={(e) => {
              e.target.play();
              localStorage.setItem("has_played_greeting", true);
            }}
          />
        </div>
      ) : null}
      <Header isUserLoggedIn={isUserLoggedIn} />
      <Banner isMentorLoggedIn={isMentorLoggedIn} />
      {/* services section */}
      <section className="tw-w-full tw-px-4 md: tw-mt-8 lg:-tw-mt-20">
        <div className="tw-w-full tw-max-w-7xl tw-mx-auto">
          <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-x-6 tw-gap-y-6 tw-items-stretch tw-justify-center">
            {servicesData.map((service, index) => (
              <Service key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      <Section kicker="features" heading="Why use Grinder ?">
          <div>
            {carousel === true ? (
              <OwlCarousel
                {...internshipsOptions}
                autoplay={true}
                lazyLoad={true}
                smartSpeed={1000}
                autoplayTimeout={3500}
                autoplayHoverPause={true}
                className="owl-carousel owl-theme"
              >
                {internshipsData.map((internship, index) => (
                  <Internship key={index} {...internship} />
                ))}
              </OwlCarousel>
            ) : null}
          </div>
          <ButtonLink
            text="View More Internships"
            href="/internship"
            className="tw-mx-auto tw-block tw-w-max tw-mt-10 hover:tw-text-white"
          />
        </Section>

      <Footer />
    </div>
  );
}
