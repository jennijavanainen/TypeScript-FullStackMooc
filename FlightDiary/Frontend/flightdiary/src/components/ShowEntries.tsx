import {Entry} from "../types";

interface Props {
    entries: Entry[];
}

const ShowEntries = ({ entries } : Props) => {
    return (
        <div>
            <h3>Diary entries</h3>
            {entries.map(entry =>
                <div key={entry.id}>
                    <h4><strong>{entry.date}</strong></h4>
                    <span>visibility: {entry.visibility}</span><br/>
                    <span>weather: {entry.weather}</span>
                </div>
            )}
        </div>
    )

};

export default ShowEntries;