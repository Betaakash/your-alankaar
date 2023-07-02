import React from "react";
import "./about.css";
import { NavLink } from "react-router-dom";
import tweetimg from "./Images/twitter.png";
import disimg from "./Images/discord.png";
import instaimg from "./Images/instagram.png";
import linkedimg from "./Images/linkedin.png";
import gitimg from "./Images/github-sign.png";
import emailimg from "./Images/email.png";

const About = () => {
  return (
    <>
      <div className="boddy">
        <div className="music">
          <p>
            An alankara is any pattern of musical decoration a musician or
            vocalist creates within or across tones, based on ancient musical
            theories or driven by personal creative choices, in a progression of
            svaras. The term alankara is standard in Carnatic music, while the
            same concept is referred to as palta or alankara in Hindustani
            music. <br /> <br />
            This Webapp eases the process of creating the alankaar patterns so
            that the musicians can practice/riyaz alankaars easily. <br />{" "}
            <br />
            Know more about thaats at{" "}
            <a id="another_link"
              href="https://www.swarganga.org/articles/icmconcepts/icm5.php"
              target="_blank"
            >
             <i>https://www.swarganga.org/ </i>
            </a>
          </p>
        </div>
        <div className="abouthero">Developed by Aakash</div>
        <p className="classp">
          <b>Get in Touch · Have a Good Day :)</b>
        </p>
        <div className="contactlinks">
          <ul className="try">
            <li>
              <a href="https://twitter.com/betaakash?t=pjiz6mrRJAzJr-IafFMjiQ&s=09">
                <img src={tweetimg} alt="Discord" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/betaakashh?igshid=MzNlNGNkZWQ4Mg==">
                <img src={instaimg} alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/aakash-sharma-74b639218">
                <img src={linkedimg} alt="Linked In" />
              </a>
            </li>
            <li>
              <a href="https://github.com/Betaakash">
                <img src={gitimg} alt="Github" />
              </a>
            </li>
            <li>
              <a href="mailto:sharmaakash22803@gmail.com">
                <img src={emailimg} alt="Mail" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <nav className="navbar fixed-top">
          <ul className="nav-list">
            <li className="logo">Alankaar</li>
            <div className="rightNav">
              <li>
                <NavLink exact activeClassName="active_class" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active_class" to="/about">
                  About
                </NavLink>
              </li>
            </div>
          </ul>
        </nav>
      <>
        
      </>{" "}
    </>
  );
};

export default About;
