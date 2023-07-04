import { Entry, HealthCheckRating } from "../../types";
import "./styles.css";

interface Props {
    entry: Entry
    rating: HealthCheckRating
}
const HealthCheckEntry = ({ entry, rating } : Props) => {
    const entryClassName = `entry-healthCheck`;
    return (
        <div className={entryClassName}>
            <span><strong>{entry.date} - {entry.type}</strong></span>
            <p>{entry.description}</p>
            <div>Healthcheck rating: {rating}</div>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

export default HealthCheckEntry;