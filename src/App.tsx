import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import JobPage from "./components/JobPage";
import MainPage from "./components/MainPage";
import { IJob } from "./types/types";

function App() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    const res = await fetch(process.env.REACT_APP_DATA_API_LINK!, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_DATA_API_TOKEN}`,
      },
    });
    if (res.status === 200 && res.ok) {
      const data: IJob[] = await res.json();
      setJobs(data);
    } else {
      console.log('Something went wrong!');
    }
    setLoading(false);
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
              <MainPage jobs={jobs} loading={loading} onToggleFavouriteJob={toggleFavouriteJob} />
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
