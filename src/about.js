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
        <div className="abouthero">Developed by Aakash</div>
        <p>
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
      <>
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
      </>{" "}
    </>
  );
};

export default About;
