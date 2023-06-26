import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../services/utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivesEntries());
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.json(toNewPatientEntry(req.body));
});

export default router;