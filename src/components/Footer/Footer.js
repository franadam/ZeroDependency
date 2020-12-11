import React from 'react';
import {
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaQuoteLeft,
} from 'react-icons/fa';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer data-test="component-footer" className={classes.main}>
      <div className={classes.header}>
        <img
          className={classes.logo}
          src="https://uploads-ssl.webflow.com/5f71d647c56bcf4dbf70403e/5fb2807a2db89f291f29b9ed_zerodependency_symbol.png"
          alt="logo"
        />
        <h2 className={classes.title}>Zero Dependency</h2>
      </div>
      <div className={classes.contact}>
        <div className={classes.address}>
          <h3 className={classes.subtitle}>Get in touch with us.</h3>
          <div>
            Zero Dependency Limited
            <br />
            M-Sparc
            <br />
            Menai Science Park
            <br />
            Gaerwen
            <br />
            Anglesea
            <br />
            LL60 6AR
          </div>
          <p>contact@zerodependency.co.uk</p>
        </div>
        <div className={classes.cite}>
          <FaQuoteLeft className={classes.icon} />
          <div className={classes.citation}>
            <p className={classes.text}>
              For once you have tasted flight you will walk the earth with your
              eyes turned skywards, for there you have been and there you will
              long to return{' '}
            </p>
            <p className={classes.author}>Leonardo Davinci</p>
          </div>
        </div>
      </div>
      <div>
        <div className={classes.social}>
          <a
            className={classes.lk}
            href="https://github.com/ZeroDependency/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaGithub className={classes.icon} />
          </a>
          <a
            className={classes.lk}
            href="https://www.twitter.com/ZeroDependency"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTwitter className={classes.icon} />
          </a>
          <a
            className={classes.lk}
            href="https://www.facebook.com/ZeroDependency"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaFacebook className={classes.icon} />
          </a>
          <a
            className={classes.lk}
            href="https://uk.linkedin.com/company/zero-dependency"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedin className={classes.icon} />
          </a>
        </div>
      </div>
      <div className={classes.right}>
        <p>© Zero Dependency Limited 2020, all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
