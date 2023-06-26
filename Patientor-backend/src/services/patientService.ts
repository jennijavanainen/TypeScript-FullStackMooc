import patients from '../../data/patients';
import {Patient, NonSensitivePatientEntry} from '../types';
import {v1 as uuid} from 'uuid';

const allPatients: Array<Patient> = patients as Array<Patient>;

const getEntries = (): Patient[] => {
    return allPatients;
};

const getNonSensitivesEntries = (): NonSensitivePatientEntry[] => {
    return allPatients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: Patient): Patient => {
    const newPatient = {
        id: uuid(),
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        ssn: patient.ssn,
        gender: patient.gender,
        occupation: patient.occupation,
    };
    allPatients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitivesEntries,
    addPatient,
};