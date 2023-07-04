import React from "react";
import { Entry, Diagnosis } from "../../types";
interface Props {
    entry : Entry
    diagnosis: Diagnosis[]
}

const EntryDetails = ({ entry, diagnosis } : Props) => {

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

};

export default EntryDetails;