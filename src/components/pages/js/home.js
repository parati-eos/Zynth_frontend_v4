// Home.js
import React from "react";
import Navbar from "../../shared/js/Home_login";
import { Footer } from "../../shared/js/footer";
import { HeroParallaxDemo } from "../home/hero.tsx";
import { BackgroundBoxesDemo } from "../home/pitch.tsx";
import Blog from "../home/blog.tsx";
import { StickyScrollRevealDemo } from "../home/stickyScrollReveal.tsx";
import Stats from "../home/stats.tsx";
import { isIphone } from "../../../utils/deviceUtils.js";

function Home() {
  return (
    <div style={{ backgroundColor: "transparent", overflowX: 'hidden', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <HeroParallaxDemo/>
      <div id="features">
        <StickyScrollRevealDemo />
      </div>
      <Stats />
      <div id="blogs">
        <Blog />
      </div>
      {!isIphone() && <BackgroundBoxesDemo />}
      <Footer />
    </div>
  );
}

export default Home;