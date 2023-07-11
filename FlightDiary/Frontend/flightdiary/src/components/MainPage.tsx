import AddNewEntry from "./AddNewEntry";
import ShowEntries from "./ShowEntries";
import {Entry} from "../types";

interface Props {
    entries: Entry[];
    setEntries: (values: Entry[]) => void;
}

const MainPage = ({ entries, setEntries }: Props) => {
    return (
        <div>
            <AddNewEntry entries={entries} setEntries={setEntries} />
            <ShowEntries entries={entries}/>
        </div>
    )
};

export default MainPage;