import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, Diagnosis } from "../types";
import EntryDetails from "./EntryInformation/EntryDetails";

type Id = {
    id: string;
}

interface Props {
    diagnosis : Diagnosis[]
}

const PatientPage = ({ diagnosis } : Props) => {
    const [patient, setPatient] = useState<Patient>({
        id:"", name:"", dateOfBirth:"", ssn:"", gender:Gender.Other, occupation:"", entries:[]
    });
    const {id} = useParams<Id>();

    React.useEffect(() => {
        const getPatient = async () =>{
            try {
                const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patient)
            } catch (e) {
                console.error(e);
            }
        }
        void getPatient();
    },[])

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>entries</h3>
            {patient.entries.map(entry =>
                <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
            )}
        </div>
    )
}

export default PatientPage;