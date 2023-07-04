import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "./state";
import { Patient, Gender  } from "../types";
import { Button } from "@mui/material";

type Params = {
    id: string;
}

const PatientPage: React.FC = () => {
    const [patient, setPatient] = React.useState<Patient>({
        id:"", name:"", dateOfBirth:"", ssn:"", gender:Gender.Female, occupation:""
    });
    const {id} = useParams<Params>();
    const [, dispatch] = useStateValue();

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
    },[dispatch])

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
        </div>
    )
}

export default PatientPage;