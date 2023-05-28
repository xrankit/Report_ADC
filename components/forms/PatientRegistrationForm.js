import { useRef, useState } from 'react';
import { validateID, validateName, validateAddress } from './validations.js';
import styles from '../../styles/Forms.module.css';
import AddData from '../scripts/AddData.js';
import GetData from '../scripts/GetData.js';
import Modal from '../cards/Modal';
import Image from 'next/image';

export default function PatientRegistrationForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️ ');
  const [Data, setData] = useState({
    patientsID: '',
    patientsName: '',
    number: '',
    address: '',
    allergies: '',
    gender: '',
    dob: '',
    walletAddress: '',
  });

  const patientsIDRef = useRef();
  const patientsNameRef = useRef();
  const addressRef = useRef();
  const allergiesRef = useRef();
  const dobRef = useRef();
  const walletAddressRef = useRef();

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  const { addPatient } = AddData();
  const { getPatient } = GetData();

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

    data.number = patientsIDRef.current.value.replace(/\s+/g, ' ').trim();
    data.patientsID = patientsIDRef.current.value.replace(/\s+/g, ' ').trim();
    let num = data.number;
    // num = `${num}${num.charAt(0)}${num.charAt(1)}`;

    if (validateID(num)) data.patientsID = num;
    else {
      valid = false;
      msg = msg + '|  Invalid Number  |';
    }

    // Check if the patient with that id already exists
    const checkPatient = await getPatient(data.patientsID);
    if (checkPatient[0].length > 3) {
      msg = `Patient with id ${data.patientsID} already exists⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      setTimeout(() => {
        msg = 'Invalid Input: Please enter valid input values ⁉️  ';
        setShowModal(false);
        setMessage(msg);
      }, 5000);
      return false;
    }

    if (validateName(patientsNameRef.current.value.replace(/\s+/g, ' ').trim()))
      data.patientsName = patientsNameRef.current.value
        .replace(/\s+/g, ' ')
        .trim();
    else {
      valid = false;
      msg = msg + '|  Invalid Name  |';
    }
    if (validateAddress(addressRef.current.value.replace(/\s+/g, ' ').trim()))
      data.address = addressRef.current.value.replace(/\s+/g, ' ').trim();
    // remove extra spaces
    else {
      valid = false;
      msg = msg + '|  Invalid Address  |';
    }

    let allergies = allergiesRef.current.value.replace(/\s+/g, ' ').trim(); // remove all extra spaces
    data.allergies = allergies;
    // let allergies = allergiesRef.current.value.replace(/\s+/g, '').trim(); // remove all spaces
    // if (allergies.length > 3) {
    //   allergies = allergies.split(',');
    //   let temp = data.allergies.concat(allergies);
    //   allergies = [...new Set([...data.allergies, ...allergies])];
    //   data.allergies = [...allergies];
    //   console.log(allergies);
    // }
    data.dob = String(dobRef.current.value);
    data.gender = gender;
    await setData(data);

    data.walletAddress = walletAddressRef.current.value;
    if (data.walletAddress == '' || data.walletAddress.size == 42) {
      valid = false;
      msg = msg + "  Invalid Patient's Wallet Address,  ";
    }

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }

    await addPatient(data);
    msg = `Transaction Successful: Data added to the Ethereum Blockchain`;
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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="patient-name"
          className="patient-name"
          placeholder="Patient's Name"
          ref={patientsNameRef}
          required
        />
        <input
          type="tel"
          name="phone-number"
          className="phone-number"
          placeholder="Phone Number"
          ref={patientsIDRef}
          required
        />
        <input
          type="text"
          name="walletAddress"
          className="walletAddress"
          placeholder="Wallet Address: 0x087298b2F76741E2D30566A7f5138D6896aBf108"
          ref={walletAddressRef}
          required
        />
        <div className={styles.rowForm}>
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" ref={dobRef} />
        </div>
        <div className={styles.rowForm} onChange={setGender}>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" name="gender" value="Male" selected />
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="Female" />
        </div>
        <textarea
          name="patients-address"
          id="patients-address"
          cols="20"
          rows="4"
          placeholder="Address"
          ref={addressRef}
        ></textarea>
        <textarea
          name="allergies"
          id="allergies"
          cols="20"
          rows="4"
          placeholder="Allergies"
          ref={allergiesRef}
        ></textarea>
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
