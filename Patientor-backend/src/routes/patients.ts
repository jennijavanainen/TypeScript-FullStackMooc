import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatientEntry } from '../services/utils';
import { Patient } from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.json(toNewPatientEntry(req.body));
});

router.get('/:id', (req, res) => {
    const patients = patientService.getEntries();
    const patient = patients.find(n => n.id === req.params.id) as Patient;
    res.json(patient);
});

router.post('/:id/entries', (req, res) => {
    const entry = patientService.addEntry(req.body)
    const patients = patientService.getEntries();
    const patient = patients.find(patient => patient.id === req.params.id) as Patient;
    const newEntry = toNewEntry(entry, patient);
    patientService.updatePatients(newEntry);
    res.json(newEntry);
});

export default router;