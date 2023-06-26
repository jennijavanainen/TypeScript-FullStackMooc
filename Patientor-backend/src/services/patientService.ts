import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry } from '../types';

const allPatients: Array<Patient> = patients as Array<Patient>;

const getEntries = (): Patient[] => {
    return allPatients;
};

const getNonSensitivesEntries = (): NonSensitivePatientEntry[] => {
    return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries,
    getNonSensitivesEntries,
};