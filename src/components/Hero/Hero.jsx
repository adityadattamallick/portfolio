import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, I am Aditya.</h1>
        <p className={styles.description}>I am blah blah...
          Lorem ipsum dolor sit amet
           consectetur adipisicing elit.
          Molestias ipsam dolores impedit unde
           perferendis laboriosam suscipit similique,
           possimus natus distinctio quia officiis
            voluptate quaerat at repellat. Doloribus
            officiis qui quis?
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
