import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import {Patient, Gender, Diagnosis, Entry} from "../types";
import EntryDetails from "./EntryInformation/EntryDetails";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@mui/material";

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
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
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

    const handleEntrySubmit = (entry : Entry) => {
        const addNewEntry = async () => {
            try {
               const { data: newEntry } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);
               setPatient(newEntry);
               closeModal();
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setError(String(e?.response?.data?.error) || "Unrecognized axios error");
                } else {
                    console.error("Unknown error", e);
                    setError("Unknown error");
                }
            }
        }
        void addNewEntry();
    }

    return (
        <div>
            <h2>{patient.name}</h2>
            <p>gender: {patient.gender}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <AddEntryModal
                onSubmit={handleEntrySubmit}
                modalOpen={modalOpen}
                error={error}
                onClose={closeModal}
                diagnosis={diagnosis}/>
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
            <h3>entries</h3>
            {patient.entries.map(entry =>
                <EntryDetails key={entry.id} entry={entry} diagnosis={diagnosis} />
            )}
        </div>
    )
}

export default PatientPage;