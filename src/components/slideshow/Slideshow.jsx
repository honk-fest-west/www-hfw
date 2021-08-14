import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './Slideshow.module.css';

export default function Slideshow({ slides }) {
  const lg_screen = useMediaQuery({ query: '(min-width: 640px)' });
  const sizes = {
    sm: { w: '535', h: '214' },
    lg: { w: '984', h: '430' },
  };
  const image_size = lg_screen ? sizes.lg : sizes.sm;
  const image_urls = slides.map((slide) => {
    return `${slide}&tr=w-${image_size.w},h-${image_size.h},f-jpg,pr-true`;
  });

  console.log('SSR', import.meta.env.SSR);

  return (
    <section
      className={`relative pt-[40%] ${styles.carousel}`}
      aria-label="Gallery"
    >
      {import.meta.env.SSR ? (
        <></>
      ) : (
        <ol className={styles.viewport}>
          {image_urls.map((image_url) => (
            <li tabindex="0" className={styles.slide}>
              <img
                width={image_size.w}
                height={image_size.h}
                className="xobject-cover object-center w-full h-full"
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
