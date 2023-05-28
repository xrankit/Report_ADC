import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import PatientForm from '../components/forms/PatientForm.js';
import Redirect from '../components/cards/Redirect.js';
import useSession from '../components/hooks/useSession.js';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Reports() {
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
        <title>Patients </title>
      </Head>
      <Navbar />
      {getItem('address') ? <></> : <Redirect />}
      <section style={{ PointerEvents: `${pointerEvent}` }}>
        <PatientForm />
      </section>
    </>
  );
}
