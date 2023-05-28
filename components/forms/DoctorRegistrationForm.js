import { useRef, useState } from 'react';
import { validateID, validateName } from './validations.js';
import styles from '../../styles/Forms.module.css';
import AddData from '../scripts/AddData.js';
import GetData from '../scripts/GetData.js';
import Modal from '../cards/Modal';
import Image from 'next/image';

export default function RegistrationForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️  ');
  const [Data, setData] = useState({
    doctorsID: '',
    speciality: '',
    doctorsName: '',
    hospital: '',
    gender: '',
  });

  const { addDoctor } = AddData();
  const { getDoctor } = GetData();

  const specialityRef = useRef();
  const doctorsNameRef = useRef();
  const hospitalRef = useRef();
  const doctorsIDRef = useRef();

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

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
    let data = { ...Data };

    if (validateID(doctorsIDRef.current.value.trim())) {
      data.doctorsID = doctorsIDRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Number  |';
    }

    // Check if any Docotr with the same id exists
    const checkDoctor = await getDoctor(data.doctorsID);
    if (checkDoctor[0].length > 3) {
      msg = `Doctor with id ${data.doctorsID} already exists⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      setTimeout(() => {
        msg = 'Invalid Input: Please enter valid input values ⁉️  ';
        setShowModal(false);
        setMessage(msg);
      }, 5000);
      return false;
    }

    if (validateName(specialityRef.current.value.trim())) {
      data.speciality = specialityRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Speciality  |';
    }
    if (validateName(doctorsNameRef.current.value.trim())) {
      data.doctorsName = doctorsNameRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Name  |';
    }
    if (validateName(hospitalRef.current.value.trim())) {
      data.hospital = hospitalRef.current.value.trim();
    } else {
      valid = false;
      msg = msg + '|  Invalid Hospital  |';
    }

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }
    data.gender = gender;

    await setData(data);
    await addDoctor(data);
    msg = `Transaction Successful: Data added to Ethereum Blockchain`;
    await setMessage(msg);
    await setShowModal(true);
    setTimeout(() => {
      msg = 'Invalid Input: Please enter valid input values ⁉️  ';
      setShowModal(false);
      setMessage(msg);
    }, 5000);
    return true;
  };

  let gender = 'Male';
  const setGender = (e) => {
    gender = e.target.value;
  };

  // * Adding to contract

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctor"
          className="doctor"
          placeholder="Doctor's Name"
          ref={doctorsNameRef}
        />
        <input
          type="text"
          name="speciality"
          className="speciality"
          placeholder="Speciality"
          ref={specialityRef}
        />
        <div className={styles.rowForm} onChange={setGender}>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" name="gender" value="Male" selected />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="Female" />
        </div>
        <input
          type="tel"
          name="doctors-id"
          className="doctors-id"
          placeholder="Doctor's ID"
          ref={doctorsIDRef}
        />
        <input
          type="text"
          name="hospital"
          className="hospital"
          placeholder="Hospital"
          ref={hospitalRef}
        />
        <button type="submit" className={styles.btn}>
          Submit
        </button>
        {/* <div className={styles.state}>
        <span>{JSON.stringify(Data)}</span>
      </div> */}
      </form>
      <section>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            <div className={styles.form} style={{ boxShadow: 'none' }}>
              <Image
                loader={myLoader}
                src="https://www.samrattechnologies.com/assets/images/wallpaper/processing.gif"
                alt="Report"
                width={300}
                height={150}
              />
            </div>
            {Message}
          </Modal>
        )}
      </section>
    </>
  );
}
