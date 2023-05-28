import { useRef, useState } from 'react';
import { validateID } from './validations.js';
import styles from '../../styles/Forms.module.css';
import GetData from '../scripts/GetData.js';
import DoctorsData from '../cards/DoctorsData.js';
import Modal from '../cards/Modal';
import Image from 'next/image';

export default function DoctorsForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️ ');
  const [ID, setID] = useState('');
  const [Doctor, setDoctor] = useState({
    doctorsID: '',
    doctorsName: '',
    speciality: '',
    hospital: '',
    gender: '',
  });

  const IDRef = useRef();

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  // * using Custom hook to interact with Contract
  // const { connect, account, user, getDoctor } = useDoctors();
  const { getDoctor } = GetData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    msg = `Processing Request: Please wait`;
    await setMessage(msg);
    await setShowModal(true);
    setTimeout(() => {
      msg = 'Invalid Input: Please enter valid input values ⁉️  ';
      setShowModal(false);
      setMessage(msg);
    }, 5000);


    let valid = true;
    let msg = 'Invalid Input: Please enter valid input values ⁉️  ';
    if (!validateID(IDRef.current.value.trim())) {
      valid = false;
      msg = msg + "  Invalid Doctor's ID  |";
    } else await setID(IDRef.current.value);

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }

    const resData = await getDoctor(ID);
    const doctor = { ...Doctor };
    doctor.doctorsID = ID;
    doctor.doctorsName = resData[0];
    doctor.speciality = resData[1];
    doctor.hospital = resData[2];
    doctor.gender = resData[3];

    if (doctor.doctorsName == '' || doctor.doctorsName == undefined) {
      msg = `No Doctor exists with id: ${IDRef.current.value}⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      return;
    }

    await setDoctor(doctor);
    msg = `Transaction Successful: Data received from the Ethereum Blockchain`;
    await setMessage(msg);
    await setShowModal(true);
    setTimeout(() => {
      msg = 'Invalid Input: Please enter valid input values ⁉️  ';
      setShowModal(false);
      setMessage(msg);
    }, 5000);
    return true;
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Doctor's ID"
          ref={IDRef}
          style={{ textAlign: 'center' }}
          required
        />
        {/* <input type="text" placeholder="Patient's ID" /> */}
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
      <DoctorsData Doctor={Doctor} />

      {Doctor.doctorsName ? (
        <div className={styles.form} style={{ boxShadow: 'none' }}>
          <Image
            loader={myLoader}
            src="https://www.careerguide.com/career/wp-content/uploads/2020/03/doctor-animated-132740-2519962.gif"
            alt="Doctor"
            width={450}
            height={300}
          />
        </div>
      ) : (
        <></>
      )}

      <section>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            {Message}
            <div className={styles.form} style={{ boxShadow: 'none' }}>
              <Image
                loader={myLoader}
                src="https://c.tenor.com/nYCc0GbYYp8AAAAC/healthy-doctor.gif"
                alt="Report"
                width={300}
                height={300}
              />
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
