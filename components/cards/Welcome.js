import styles from '../../styles/cards.module.css';
import { useState } from 'react';
import Modal from '../cards/Modal';
import Image from 'next/image';

export default function Welcome() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('');

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };
  return (
    <>
      <div
        className={styles.card}
        style={{
          boxShadow: 'none',
          backgroundImage: 'none',
          backgroundColor: 'rgba(0,0,0,0.01)',
          background: 'transparent',
        }}
      >
        <h1 className={styles.head}>Welcome to Medikeeper</h1>
        <h3 className={styles.head}>Blockchain-based Medical Record Storage</h3>
        <br />
        <p>
          Too often our health must take the back seat for what really is
          important,
        </p>
        <p>
          it is only when you lose your health that you realise how important it
          is.
        </p>
        <p>
          We are in the business of getting people's health back and teaching
          them how to stay healthy.
        </p>
        <p>
          We provide a secure reporsitory on Ethereum Blockchain to stores your
          medical records and makes them accessible to the right user when
          needed.
        </p>
        <button className={styles.head} onClick={() => setShowModal(true)}>
          DIRECTIONS OF USE
        </button>
        <Image
          loader={myLoader}
          src="https://scitechdaily.com/images/Futuristic-Medicine-Health-Data-Biotechnology.gif"
          alt="Picture of the author"
          width={700}
          height={400}
          style={{ borderRadius: '1.5rem' }}
        />
      </div>
      <section>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            <h3 className={styles.head}>Directions of use:</h3>
            <div
              className={styles.form}
              style={{
                boxShadow: 'none',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image
                loader={myLoader}
                src="https://www.icegif.com/wp-content/uploads/teaching-icegif-2.gif"
                alt="Directions of use"
                width={200}
                height={150}
              />
            </div>

            {Message}
            <div style={{ fontSize: '1rem' }}>
              <ol>
                <li>
                  <span>Open Metamask mobile app/extention.</span>
                </li>
                <li>
                  <span>Change network to Goerli Test Network.</span>
                </li>
                <li>
                  <span>Click on Connect button on Homepage.</span>
                </li>
                <li>
                  <span>Select the account you want to connect.</span>
                </li>
                <li>
                  <span>
                    If connected isn't displayed then click Connect again.
                  </span>
                </li>
                <li>
                  <span>
                    To disconnect, hit reset and open Metamask app and
                    disconnect from there.
                  </span>
                </li>
              </ol>
              <br />
              <div className={styles.head}>
                <a
                  href="https://github.com/PrashantAmoli/Medikeeper"
                  target="_blank"
                >
                  Want to know more?
                </a>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
