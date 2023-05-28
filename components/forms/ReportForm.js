import { useRef, useState } from 'react';
import { validateID, validateName, validateFile } from './validations.js';
import styles from '../../styles/Forms.module.css';
import AddData from '../scripts/AddData.js';
import GetData from '../scripts/GetData.js';
import Modal from '../cards/Modal';
import useStorage from '../hooks/useStorage';
import Image from 'next/image';

export default function ReportForm() {
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️ ');

  const { uploadFile } = useStorage();

  const [Data, setData] = useState({
    patientsID: '',
    lastUpdated: '',
    currentMedicalDosage: '',
    updatedBy: '',
    diagnosis: '',
    pdf: '',
  });

  const patientsIDRef = useRef();
  const doctorsIDRef = useRef();
  const diagnosisRef = useRef();
  const prescriptionRef = useRef();
  const dobRef = useRef();
  const fileRef = useRef();

  const { addRecord } = AddData();
  const { getPatient, getDoctor } = GetData();

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

    if (validateID(patientsIDRef.current.value.trim()))
      data.patientsID = patientsIDRef.current.value.trim();
    else {
      valid = false;
      msg = msg + "   Invalid Patient's ID   |";
    }
    if (validateID(doctorsIDRef.current.value.trim()))
      data.updatedBy = doctorsIDRef.current.value.trim();
    else {
      valid = false;
      msg = msg + "   Invalid Doctor's ID  |";
    }

    if (validateName(diagnosisRef.current.value.trim()))
      data.diagnosis = diagnosisRef.current.value;
    else {
      valid = false;
      msg = msg + '   Invalid Diagnosis  |';
    }

    if (validateName(prescriptionRef.current.value.trim()))
      data.currentMedicalDosage = prescriptionRef.current.value;
    else {
      valid = false;
      msg = msg + '   Invalid Prescription  |';
    }

    data.lastUpdated = String(dobRef.current.value);
    if (
      data.lastUpdated == null ||
      data.lastUpdated == undefined ||
      data.lastUpdated == ''
    ) {
      valid = false;
      msg = msg + '   Invalid Date  |';
    }

    const checkDoctor = await getDoctor(data.updatedBy);
    if (checkDoctor[0].length < 3) {
      msg = `No Doctor exists with ID: ${data.updatedBy}⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      setTimeout(() => {
        msg = 'Invalid Input: Please enter valid input values ⁉️  ';
        setShowModal(false);
        setMessage(msg);
      }, 4000);
      return false;
    }

    const checkPatient = await getPatient(data.patientsID);
    if (checkPatient[0].length < 3) {
      msg = `No Patient exists with ID: ${data.patientsID}⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      setTimeout(() => {
        msg = 'Invalid Input: Please enter valid input values ⁉️  ';
        setShowModal(false);
        setMessage(msg);
      }, 4000);
      return false;
    }

    const file = fileRef.current.value;
    if (!validateFile(file)) {
      msg = msg + '   Invalid file  |';
    } else {
      const cid = await uploadFile(fileRef.current);
      data.pdf = `https://dweb.link/ipfs/${cid}`;
    }

    await setData(data);

    if (valid == false) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    } else {
      msg = `Uploading data to Ethereum Blockchain will take a minute. 
      Please wait...`;
      await setMessage(msg);
      await setShowModal(true);
    }

    if (data.pdf == `https://dweb.link/ipfs/`) {
      msg = `    PDF Report didn't get uploaded to IPFS: Please try again.  ${data.pdf}  |`;
      await setMessage(msg);
      await setShowModal(true);

      setTimeout(() => {
        msg = 'Invalid Input: Please enter valid input values ⁉️  ';
        setShowModal(false);
        setMessage(msg);
      }, 4000);
      return false;
    }

    await addRecord(data);
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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctor"
          className="doctor"
          placeholder="Doctor's ID"
          ref={doctorsIDRef}
        />
        <input
          type="text"
          name="patient-id"
          className="patient-id"
          placeholder="Patient ID"
          ref={patientsIDRef}
        />
        <div className={styles.rowForm}>
          <label htmlFor="dob">Updated on: </label>
          <input type="date" id="dob" name="dob" ref={dobRef} />
        </div>
        <div className={styles.rowForm}>
          <input
            type="file"
            id="report"
            name="report"
            accept=".pdf"
            ref={fileRef}
          />
        </div>
        <textarea
          name="diagnosis"
          id="diagnosis"
          cols="20"
          rows="4"
          placeholder="Diagnosis :"
          ref={diagnosisRef}
        ></textarea>
        <textarea
          name="prescription"
          id="prescription"
          cols="20"
          rows="4"
          placeholder="Prescription :"
          ref={prescriptionRef}
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
