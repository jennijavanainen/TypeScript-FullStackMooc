
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

export const parseArguments = (args: Array<string>): Array<number> => {
    if (args.length < 1) throw new Error("Not enough arguments");

    const hours: Array<number> = args.map(day => Number(day));
    if (!hours.includes(NaN)) {
        return hours;
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

export const calculateExercises = (hours: Array<number>, target: number): Result => {
    let trainingDays = 0;
    const average = hours.reduce((total, n) => {
        if (n > 0) trainingDays++;
        return total + n;
    }, 0) / hours.length;

    let success = false;
    if (average >= target) success = true;

    let rating = 1;
    let ratingDescription = "epic fail";

    if (success) {
        rating = 3;
        ratingDescription = "success";
    } else if (average / target > 0.5) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }
    return {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
};

try {
    const target = Number(process.argv[2]);
    const hours: Array<number> = parseArguments(process.argv.slice(3));

    console.log(calculateExercises(hours, target));

} catch (error:unknown) {
    let errorMessage = "Something bad happened";
    if (error instanceof Error) {
        errorMessage += ' ErrorLogger: ' + error.message;
    }
    console.log(errorMessage);
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))