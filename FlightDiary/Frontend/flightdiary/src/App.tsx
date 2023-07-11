
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Entry } from "./types";
import diaryService from "./services/diaryService";
import MainPage from "./components/MainPage";


const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const entries = await diaryService.getAll();
      setEntries(entries);
      console.log(entries);
    };

    void fetchDiaryEntries();
  }, []);


  return (
      <div className="App">
        <Router>
          <Container>
            <Typography variant="h2" style={{ marginBottom: "0.5em" }}>
              Flight Diary
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Divider hidden />
            <Routes>
              <Route path="/" element={<MainPage entries={entries} setEntries={setEntries}/>}/>
            </Routes>
          </Container>
        </Router>
      </div>
  );
};

export default App;
