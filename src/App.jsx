import React from "react";
import RandomQuote from "./components/RandomQuote";
import BackgroundYuruCamp from './assets/BackgroundYuruCamp.jpg';
import YuruCampLogo from './assets/YuruCampLogo.png';

export default function App() {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: `url(${BackgroundYuruCamp})`}}>
      <div className="hero-overlay backdrop-blur-sm" />
      <img src={YuruCampLogo} alt="Yuru Camp Logo" className="z-10 w-4xl" />
      <div className="w-11/12 z-10">
        <RandomQuote />
      </div>
    </div>
  )
}