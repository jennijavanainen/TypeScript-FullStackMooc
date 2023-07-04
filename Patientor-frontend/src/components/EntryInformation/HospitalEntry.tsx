import { Entry } from "../../types";
import "./styles.css";

interface Props {
    entry : Entry
    dischargeDate : string
    dischargeCriteria : string
}

const HospitalEntry = ({ entry, dischargeDate, dischargeCriteria } : Props) => {
    const entryClassName = `entry-hospital`;

    return (
        <div className={entryClassName}>
            <span><strong>{entry.date} - {entry.type}</strong></span>
            <p>{entry.description}</p>
            <p>Discharge date: {dischargeDate}</p>
            <p><em>Criteria for discharge: {dischargeCriteria}</em></p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    )
};

export default HospitalEntry;