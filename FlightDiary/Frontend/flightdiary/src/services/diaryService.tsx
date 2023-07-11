import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Entry } from "../types";

const getAll = async () => {
    const { data } = await axios.get<Entry[]>(
        `${apiBaseUrl}/diaries`
    );

    return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
};