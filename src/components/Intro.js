import "./Intro.css";
import React, { useEffect } from "react";
import sealOfOrichalcos from "../assets/images/seal-of-orichalcos.png";
import cardSleeve from "../assets/images/card-sleeve.jpg";

const Intro = ({ setShowIntro, showIntro }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 5500);
    return () => {
      clearTimeout(timeout); //Clear timeout to avoid memory leaks
    };
  }, [setShowIntro]);

  if (!showIntro) {
    return null;
  }

  const card = () => {
    return (
      <section className="card">
        <div className="card-item w-full h-full">
          <div className="card__side card__side--front">
            <img src={cardSleeve} alt="card-sleeve" />
          </div>
          <div className="card__side card__side--back">
            <img
              className="glow"
              src={sealOfOrichalcos}
              alt="seal-of-orichalcos"
            />
          </div>
        </div>
      </section>
    );
  };
  return (
    <div className="intro">
      <div className="left-side">{card()}</div>
      <div className="right-side">{card()}</div>
    </div>
  );
};

export default Intro;
