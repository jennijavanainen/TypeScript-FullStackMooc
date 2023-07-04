export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Entry {
}