import patients from '../../data/patients';
import { Entry, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const allPatients: Array<Patient> = patients as Array<Patient>;

const getEntries = (): Patient[] => {
    return allPatients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
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
        entries: patient.entries
    };
    allPatients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: Entry): Entry => {

    switch (entry.type) {
        case "Hospital":
            return {
                id: uuid(),
                date: entry.date,
                type: entry.type,
                specialist: entry.specialist,
                discharge: entry.discharge,
                description: entry.description,
                diagnosisCodes: entry.diagnosisCodes
            };
        case "OccupationalHealthcare":
            return {
                id: uuid(),
                date: entry.date,
                type: entry.type,
                specialist: entry.specialist,
                employerName: entry.employerName,
                description: entry.description,
                sickLeave: entry.sickLeave,
                diagnosisCodes: entry.diagnosisCodes
            };
        case "HealthCheck":
            return {
                id: uuid(),
                date: entry.date,
                type: entry.type,
                specialist: entry.specialist,
                description: entry.description,
                diagnosisCodes: entry.diagnosisCodes,
                healthCheckRating: entry.healthCheckRating
            };
        default:
            return assertNever(entry);
    }
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const updatePatients = (patient: Patient) => {
    allPatients.map(p => {
        if (p.id === patient.id) {
            p.dateOfBirth = patient.dateOfBirth;
            p.entries = patient.entries;
            p.gender = patient.gender;
            p.name = patient.name;
            p.occupation = patient.occupation;
            p.ssn = patient.ssn;
        }
    });
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    addEntry,
    updatePatients,
};