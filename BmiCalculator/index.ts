import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseArguments } from "./exerciseCalculator";

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height,weight);

    if (isNaN(height) || isNaN(weight)){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: "malformed parameters"}));
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            height: height,
            weight: weight,
            bmi: bmi
        }));
    }
});
app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (target === undefined){
        res.end(JSON.stringify({error: "parameters missing"}));
    } else if (!daily_exercises || daily_exercises.some(isNaN)){
        res.end(JSON.stringify({error:"Malformed parameters"}));
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const data = parseArguments(daily_exercises);
        const result = calculateExercises(data, Number(target));
        res.end(JSON.stringify(result));
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});