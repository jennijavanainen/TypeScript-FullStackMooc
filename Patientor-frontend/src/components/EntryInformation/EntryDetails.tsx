import React from "react";
import { Entry, Diagnosis } from "../../types";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
interface Props {
    entry : Entry
    diagnosis: Diagnosis[]
}

const EntryDetails = ({ entry, diagnosis } : Props) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} dischargeDate={entry.discharge.date} dischargeCriteria={entry.discharge.criteria}/>
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} rating={entry.healthCheckRating} />
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} employer={entry.employerName} startDate={entry.sickLeave?.startDate}
                                                endDate={entry.sickLeave?.endDate} />
        default:
            return assertNever(entry);
    }


    // 9.24 version
    /*
    return (
        <div key={entry.id}>
            <span>{entry.date} - <em>{entry.description}</em></span>
            {entry.diagnosisCodes && <ul>{entry.diagnosisCodes.map(code => {
                const matchingDiagnosis = diagnosis.find(
                    (item) => item.code === code
                );
                const diagnosisName = matchingDiagnosis
                    ? matchingDiagnosis.name
                    : "Unknown Diagnosis";
                return (
                    <li key={code}>{code} - {diagnosisName}</li>);
                })}
            </ul>}
        </div>
    )

     */

};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export default EntryDetails;