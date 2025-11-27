import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, I am Aditya.</h1>
        <p className={styles.description}>
          I am a tech enthusiat who works with frontend, backend and
          machine-learning/deep-learning technologies. I completed my bachelor's
          degree from North South University in Computer Science and
          Engineering. I learned the computer science fundamentals and core
          stuff there, such as DSA, computer architechture, computer networking,
          machine learning, web development. I needed to submit projects for
          acadmic courses to get an evaluation on my skills there. Also, I
          worked on two acadmic research projects there on deep-learning.
        </p>
        <a href="mailto:mymail@gmail.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Hero Image"
        className={styles.heroImage}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
