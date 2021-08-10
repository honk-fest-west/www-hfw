import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Slideshow.module.css';

export default function Slideshow({ slides }) {
  const lg_screen = useMediaQuery({ query: '(min-width: 640px)' });
  const image_urls = slides.map((slide) => {
    return lg_screen
      ? `${slide}&tr=w-984,h-430,f-jpg,pr-true`
      : `${slide}&tr=w-535,h-214,f-jpg,pr-true`;
  });

  return (
    <section className="relative pt-[40%]" aria-label="Gallery">
      {import.meta.env.SSR ? (
        <></>
      ) : (
        <ol className={styles.viewport}>
          {image_urls.map((image_url) => (
            <li tabindex="0" className={styles.slide}>
              <img
                className="xobject-cover object-center w-full"
                src={image_url}
              />
              <div className={styles.snapper}></div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
