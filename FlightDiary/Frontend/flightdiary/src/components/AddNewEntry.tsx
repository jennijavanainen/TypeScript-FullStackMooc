import { Entry } from "../types";
import React, { useState } from "react";
import {apiBaseUrl} from "../constants";
import axios from "axios";
import ErrorLogger from "./ErrorLogger";

interface Props {
    entries: Entry[];
    setEntries: (values: Entry[]) => void;
}
const AddNewEntry = ({ entries, setEntries } : Props) => {
    const [date, setDate] = useState("");
    const [visibility, setVisibility] = useState("");
    const [weather, setWeather] = useState("");
    const [comment, setComment] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newEntry: Entry = {
            id: '',
            date,
            visibility,
            weather,
            comment,
        };

        const addNewEntry = async () => {
            try {
                await axios.post<Entry>(`${apiBaseUrl}/diaries` , newEntry);
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || "Unrecognized axios error");
                    setErrorMessage(e.toString());
                    setShowError(true);
                } else {
                    console.error("Unknown error", e);
                    setShowError(true);
                }
            }
        }
        void addNewEntry();

        setEntries([...entries, newEntry]);
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
    };

    return (
        <div>
            <h3>Add new entry</h3>
            <ErrorLogger showError={showError} errorMessage={errorMessage} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="visibility">Visibility:</label>
                    <input
                        type="text"
                        id="visibility"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="weather">Weather:</label>
                    <input
                        type="text"
                        id="weather"
                        value={weather}
                        onChange={(e) => setWeather(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <input
                        type="text"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )

};

export default AddNewEntry;