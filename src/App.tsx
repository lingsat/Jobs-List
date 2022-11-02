import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import JobPage from "./components/JobPage";
import MainPage from "./components/MainPage";
import { IJob } from "./types/types";

function App() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [currentJob, setCurrentJob] = useState<IJob | undefined>(undefined);

  const toggleFavouriteJob = (id: string): void => {
    setJobs((prevJobs: IJob[]) => {
      let modedJobs = prevJobs.map((job: IJob) => {
        if (job.id !== id) {
          return job;
        } else {
          return { ...job, favourite: !job.favourite };
        }
      });
      return modedJobs;
    });
  };
  const defineCurrentJob = (id: string | undefined): void => {
    let definedJob = jobs.find((job) => job.id === id);
    setCurrentJob(definedJob);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_DATA_API_LINK!, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_DATA_API_TOKEN}`,
        },
      });
      console.log(res.status);
      const data: IJob[] = await res.json();
      console.log(data[0]);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage jobs={jobs} onToggleFavouriteJob={toggleFavouriteJob} />
            }
          />
          <Route
            path="/job/:id"
            element={
              <JobPage
                currentJob={currentJob}
                onSetCurrentJob={defineCurrentJob}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
