import { Entry  } from "../../types";
import "./styles.css";

interface Props {
    entry : Entry
    employer: string
    startDate : string | undefined
    endDate : string | undefined
}
const OccupationalHealthcareEntry = ({entry, employer, startDate, endDate} : Props) => {
    const entryClassName = `entry-occupational`;

    return (
        <div className={entryClassName}>
            <span><strong>{entry.date} - {entry.type}</strong></span>
            <p><em>{employer}</em></p>
            <p>{entry.description}</p>
            {startDate && <span>Sick leave granted: {startDate} - {endDate}</span>}
            <p>diagnose by {entry.specialist}</p>
        </div>
    );

};

export default OccupationalHealthcareEntry;