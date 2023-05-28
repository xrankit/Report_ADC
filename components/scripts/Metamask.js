import { useState, useEffect } from 'react';
import useSession from '../hooks/useSession.js';
import styles from '../../styles/cards.module.css';
import GetData from './GetData.js';
import Image from 'next/image';
import Modal from '../cards/Modal';

export default function Metamask() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState(``);
  const [Address, setAddress] = useState('');
  const [URL, setURL] = useState(
    'https://cdn.dribbble.com/users/2574702/screenshots/6702374/metamask.gif'
  );

  const { setItem, getItem, removeItem } = useSession();
  const { load, getCurrentAccount } = GetData();

  const url1 =
    'https://cdn.dribbble.com/users/2574702/screenshots/6702374/metamask.gif';
  const url2 =
    'https://houseoffirst.com/images/misc/mm_twitch_yellow_matte.gif';

  useEffect(async () => {
    if (getItem('address') && ethereum.isConnected() == false) {
      setAddress(null);
      removeItem('address');
    } else if (getItem('address')) setAddress(getItem('address'));
  }, []);

  useEffect(async () => {
    setTimeout(() => {
      URL == url1 ? setURL(url2) : setURL(url1);
    }, 5000);
  }, [URL]);

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  // Button handler button for handling a request event for metamask
  const handle = async () => {
    const loader = await load();

    if (loader == false) {
      setMessage(`Please Install Metamask`);
      setShowModal(true);
      return false;
    }

    const update = async (add) => {
      const address = await getCurrentAccount();
      if (address == '' || address == undefined) {
        return;
      }
      setTimeout(() => {
        setAddress(address);
        setItem('address', address);
      }, 1000);
    };
    await update(getCurrentAccount());
  };

  const removeSession = () => {
    setMessage(`Also Disconnect your Account from Metamask extension/app`);
    setShowModal(true);
    removeItem('address');
    setAddress(null);
  };

  return (
    <>
      <div
        className={styles.card}
        style={{
          alignItems: 'center',
          backgroundImage: 'none',
          background: 'transparent',
        }}
      >
        <h2 className={styles.head}>Metamask</h2>
        {Address == '' || Address == undefined ? (
          <>
            <button onClick={handle}>Connect</button>
            <span className={styles.head}>
              Connect using your Metamask account on Goerli Network
            </span>
          </>
        ) : (
          <>
            <br />
            <h4 className={styles.head}>Connected</h4>
            <br />
            <button onClick={removeSession}>Reset</button>
          </>
        )}
        <Image
          loader={myLoader}
          src={URL}
          alt="Metamask"
          width={400}
          height={300}
        />
      </div>

      <section>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            <div className={styles.form} style={{ boxShadow: 'none' }}>
              <h4 className={styles.head}>{Message}</h4>
              <div className={styles.head}>
                <Image
                  loader={myLoader}
                  src={URL}
                  alt="Metamask"
                  width={300}
                  height={250}
                />
              </div>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
