import styles from '../../styles/cards.module.css';

const PatientData = ({ Patient }) => {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.head}>Patient</h2>
        <br />
        <h3>Name: &emsp; {Patient.patientsName}</h3>
        <h3>Phone: &emsp; {Patient.number}</h3>
        <h3>DOB: &emsp; &ensp;{Patient.dob}</h3>
        <h3>Gender: &ensp; {Patient.gender}</h3>
        <h3>Address: &ensp;{Patient.address}</h3>
        <h3>Allergies:&nbsp;{Patient.allergies}</h3>
      </div>
    </>
  );
};

export default PatientData;
