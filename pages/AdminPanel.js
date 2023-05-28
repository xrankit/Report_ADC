import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Forms.module.css';
import cardStyles from '../styles/cards.module.css';
import Admin from '../components/scripts/Admin.js';
import Navbar from '../components/Navbar.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useRouter } from 'next/router';
import Modal from '../components/cards/Modal';
import Image from 'next/image';

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState(``);
  const [Address, setAddress] = useState('');
  const { addAuthentication, removeAuthentication } = Admin();
  const { getItem } = useSession();

  const addressRef = useRef();
  const router = useRouter();

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  const add = async (e) => {
    e.preventDefault();
    if (addressRef.current.value.length == 42) {
      await setMessage(`Authorizing`);
      await addAuthentication(addressRef.current.value);
    } else {
      await setMessage(
        `Invalid Address: Address should be of 42 characters long whereas you entered ${addressRef.current.value.length}characters only.`
      );
    }
    await setShowModal(true);
    await setMessage(`Account has been authorized`);
    await setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
    return true;
  };

  const remove = async (e) => {
    e.preventDefault();
    if (addressRef.current.value.length == 42) {
      await setMessage(`Unauthorizing`);
      await removeAuthentication(addressRef.current.value);
    } else {
      await setMessage(
        `Invalid Address: Address should be of 42 characters long whereas you entered ${addressRef.current.value.length}characters only.`
      );
    }
    await setShowModal(true);
    await setMessage(`Account has been unauthorized`);
    await setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 5000);
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      if (!getItem('address')) router.push('/');
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <Navbar />
      {getItem('address') ? (
        <form className={styles.form}>
          <h2>Admin Panel</h2>
          <input
            type="text"
            placeholder="Account Address"
            ref={addressRef}
            style={{ textAlign: 'center' }}
            required
          />

          <div className={cardStyles.row}>
            <button className={styles.btn} onClick={add}>
              Authorize
            </button>
            <button className={styles.btn} onClick={remove}>
              Unauthorize
            </button>
          </div>
        </form>
      ) : (
        <Redirect />
      )}

      <section>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            <div className={styles.form} style={{ boxShadow: 'none' }}>
              {Message}
              <br />
              <Image
                loader={myLoader}
                src="https://i.gifer.com/X0XF.gif"
                alt="Report"
                width={300}
                height={180}
              />
            </div>
          </Modal>
        )}
      </section>
    </>
  );
};

export default AdminPanel;
