import styles from '../../styles/cards.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Redirect() {
  const [Count, setCount] = useState('');

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  useEffect(() => {
    let i = 5;
    setInterval(() => {
      i = i - 1;
      setCount(i);
    }, 1000);
  }, []);
  return (
    <>
      <div className={styles.card}>
        <h3 className={styles.head}>
          You will be redirected to homepage in {Count} seconds
        </h3>
        <br />
        <h3 className={styles.head}>
          Login with your Metamask account over Goerli Network from Homepage to
          continue...
        </h3>

        <div className={styles.head}>
          <Image
            loader={myLoader}
            src="https://content.presentermedia.com/content/animsp/00022000/22813/hourglass_sand_pour_businessman_md_nwm_v2.gif"
            alt="5seconds Timer⏲ "
            width={110}
            height={125}
          />
        </div>
      </div>
    </>
  );
}
