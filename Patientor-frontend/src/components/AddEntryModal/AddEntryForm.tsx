import { useState, SyntheticEvent, ChangeEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import {Diagnosis, EntryFormValues, HealthCheckRating} from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
    diagnosis: Diagnosis[];
}

interface RatingOption {
    value: HealthCheckRating;
    label: string;
}

const ratingOptions: RatingOption[] = Object.keys(HealthCheckRating).filter(key => isNaN(Number(key))).map((key) => ({
    value: HealthCheckRating[key as keyof typeof HealthCheckRating],
    label: key,
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const onRatingChange = (event: SelectChangeEvent<Number>) => {
        event.preventDefault();
        const value = event.target.value;
        console.log(value);
        const rating = Object.values(HealthCheckRating).find(g => g === value);
        console.log(rating);
        if (rating) {
            setHealthCheckRating(rating as HealthCheckRating);
        }
    };

    const onDiagnosisSelectionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputCodes = event.target.value;
        const formattedCodes = inputCodes.split(",").map(code => code.trim());
        setDiagnosisCodes(formattedCodes);
    };

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            type: "HealthCheck",
            id: "",
            description,
            date,
            healthCheckRating,
            specialist,
            diagnosisCodes,
        });
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <InputLabel style={{ marginTop: 20 }}>Healthcheck rating</InputLabel>
                <Select
                    label="Healthcheck Rating"
                    fullWidth
                    value={healthCheckRating}
                    onChange={onRatingChange}
                >
                    {ratingOptions.map(option =>
                        <MenuItem key={option.label} value={option.value}>
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
                <TextField
                    label="Diagnosis codes"
                    fullWidth
                    value={diagnosisCodes}
                    onChange={onDiagnosisSelectionChange}
                />


                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{float: "left"}}
                            type="button"
                            onClick={onCancel}
                        >Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{float: "right"}}
                            type="submit"
                            variant="contained"
                        >Add</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;