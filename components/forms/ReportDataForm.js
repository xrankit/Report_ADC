import { useRef, useState, useEffect } from 'react';
import { validateID } from './validations.js';
import styles from '../../styles/Forms.module.css';
import cardStyles from '../../styles/cards.module.css';
import PatientData from '../cards/PatientData.js';
import DoctorsData from '../cards/DoctorsData.js';
import Report from '../cards/Report.js';
import GetData from '../scripts/GetData.js';
import Modal from '../cards/Modal';
import Image from 'next/image';

export default function ReportDataForm() {
  const [URL, setURL] = useState({
    url: 'https://scitechdaily.com/images/Futuristic-Medicine-Health-Data-Biotechnology.gif',
    width: '600',
    height: '400',
  });
  const [ID, setID] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('Something went wrong ⁉️ ');

  const [Patient, setPatient] = useState({
    patientsURL: '',
    patientsName: '',
    number: '',
    gender: '',
    address: '',
    dob: '',
    allergies: '',
  });

  const [Doctor, setDoctor] = useState({
    doctorsID: '',
    doctorsName: '',
    speciality: '',
    hospital: '',
    gender: '',
  });

  const [Reports, setReports] = useState({
    patientsID: '',
    lastUpdated: '',
    currentMedicalDosage: '',
    updatedBy: '',
    diagnosis: '',
    pdf: '',
    pdfAll: '',
  });

  const IDRef = useRef();

  const url1 =
    'https://images.squarespace-cdn.com/content/v1/5a8694a6e45a7c0c0c9dfac1/1625848330150-P6AZKX3IWVSWBSTR7D6X/report_mini_black_animated.gif';
  const url2 =
    'https://scitechdaily.com/images/Futuristic-Medicine-Health-Data-Biotechnology.gif';

  const { getPatient, getReport, getDoctor } = GetData();

  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  const getPatientData = async () => {
    const result = await getPatient(IDRef.current.value);

    const data = { ...Patient };
    data.patientsID = IDRef.current.value;
    data.patientsName = result[0];
    data.number = result[1];
    data.gender = result[2];
    data.address = result[3];
    data.dob = result[4];
    let allergies = result[5];

    if (data.patientsName == '' || data.patientsName == undefined) {
      let msg = `No patient exists with patient id ${IDRef.current.value} ⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      return;
    }

    for (let i = 11; i < allergies.length; i++) {
      data.allergies += allergies[i];
    }

    await setPatient(data);
  };

  const getDoctorData = async (id) => {
    const result = await getDoctor(id);

    const doctor = { ...Doctor };
    doctor.doctorsID = id;
    doctor.doctorsName = result[0];
    doctor.speciality = result[1];
    doctor.hospital = result[2];
    doctor.gender = result[3];

    if (doctor.doctorsName == '' || doctor.doctorsName == undefined) {
      let msg = `No Doctor exists with patient id: ${IDRef.current.value}⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      return;
    }
    await setDoctor(doctor);
  };

  const handleReport = async (e) => {
    e.preventDefault();

    msg = `Processing Request: Please wait`;
    await setMessage(msg);
    await setShowModal(true);
    setTimeout(() => {
      msg = 'Invalid Input: Please enter valid input values ⁉️  ';
      setShowModal(false);
      setMessage(msg);
    }, 5000);

    let msg = 'Invalid Input: Please enter valid ID ⁉️  ';
    if (!validateID(IDRef.current.value)) {
      await setMessage(msg);
      await setShowModal(true);
      return;
    }

    await getPatientData();

    const data = { ...Reports };
    const result = await getReport(IDRef.current.value);
    data.patientsID = IDRef.current.value;
    data.lastUpdated = result[0];
    data.currentMedicalDosage = result[1];
    data.updatedBy = result[2];
    data.diagnosis = result[3];
    data.pdf = result[4];
    data.pdfAll = result[5];

    if (
      data.pdf == '' ||
      data.pdf == undefined ||
      data.updatedBy == '' ||
      data.updatedBy == undefined
    ) {
      msg = `No report uploaded for patient ${Patient.patientsName} with id: ${IDRef.current.value}⁉️`;
      await setMessage(msg);
      await setShowModal(true);
      return;
    }

    await setReports(data);

    await getDoctorData(data.updatedBy);
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
      <form className={styles.form} onSubmit={handleReport}>
        <input
          type="text"
          placeholder="Patient ID"
          ref={IDRef}
          style={{ textAlign: 'center' }}
          required
        />
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>

      <DoctorsData Doctor={Doctor} />

      {Reports.updatedBy != '' ? (
        <div className={styles.form} style={{ boxShadow: 'none' }}>
          <Image
            loader={myLoader}
            src="https://acegif.com/wp-content/gif/gws-18.gif"
            alt="Report"
            width={400}
            height={300}
          />
        </div>
      ) : (
        <></>
      )}

      <PatientData Patient={Patient} />

      <div className={styles.form} style={{ boxShadow: 'none' }}>
        <Image
          loader={myLoader}
          src={URL.url}
          alt="Report"
          width={URL.width}
          height={URL.height}
        />
      </div>

      <Report Data={Reports} />

      {/* {Reports.updatedBy != '' ? (
        <div className={styles.form} style={{ boxShadow: 'none' }}>
          <Image
            loader={myLoader}
            src={URL.url}
            alt="Report"
            width={URL.width}
            height={URL.height}
          />
        </div>
      ) : (
        <></>
      )} */}

      <section>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            {Message}
            <div className={styles.form} style={{ boxShadow: 'none' }}>
              <Image
                loader={myLoader}
                src="https://images.squarespace-cdn.com/content/v1/5a8694a6e45a7c0c0c9dfac1/1625848330150-P6AZKX3IWVSWBSTR7D6X/report_mini_black_animated.gif"
                alt="Report"
                width={330}
                height={400}
              />
            </div>
          </Modal>
        )}
      </section>
    </>
  );
}
