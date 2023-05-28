import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import DoctorsForm from '../components/forms/DoctorsForm.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Doctors() {
  const router = useRouter();
  const { getItem } = useSession();
  let pointerEvent = 'none';

  useEffect(() => {
    setTimeout(() => {
      if (!getItem('address')) {
        pointerEvent = 'none';
        router.push('/');
      } else {
        pointerEvent = 'all';
      }
    }, 5000);
  }, []);
  return (
    <>
      <Head>
        <title>Doctors</title>
      </Head>
      <Navbar />
      {getItem('address') ? <></> : <Redirect />}
      <section style={{ PointerEvents: `${pointerEvent}` }}>
        <DoctorsForm />
      </section>
    </>
  );
}
