interface BmiValues {
    height: number;
    weight: number;
}

export const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error("Provided values were not numbers!")
    }
}

export const calculateBmi = (height: number, weight: number, printText: string): string => {
    const bmi = weight / (height * height / 10000);
    if (bmi < 18.5) return printText + "Underweight";
    else if (bmi < 25) return printText + "Normal (healthy weight)";
    else if (bmi < 30) return printText + "Overweight";
    else return printText + "Obese";
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight,`Calculated Bmi with height ${height} and weight ${weight}, the result is: `));
} catch (error:unknown) {
    let errorMessage = "Something bad happened"
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

//console.log(calculateBmi(174, 74, "Result: "))