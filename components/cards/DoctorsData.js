import styles from '../../styles/cards.module.css';

const DoctorsData = ({ Doctor }) => {
  // console.log('DD:5', JSON.stringify(Doctor));
  if (Doctor === undefined || Doctor.length == 0) {
    return (
      <div className={styles.card}>
        <br />
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.card}>
          <h2 className={styles.head}>Doctor</h2>
          <br />
          <h3>Name: &emsp; &ensp; {Doctor.doctorsName}</h3>
          <h3>Speciality: &nbsp;{Doctor.speciality}</h3>
          <h3>Hospital: &ensp; {Doctor.hospital}</h3>
          <h3>Gender: &emsp; {Doctor.gender}</h3>
        </div>
      </>
    );
  }
};

export default DoctorsData;
