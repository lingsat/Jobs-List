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
    let definedJob = jobs.find(job => job.id === id);
    setCurrentJob(definedJob);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.json-generator.com/templates/ZM1r0eic3XEy/data",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
          },
        }
      );
      const data: IJob[] = await res.json();
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
              <MainPage
                jobs={jobs}
                onToggleFavouriteJob={toggleFavouriteJob}
                
              />
            }
          />
          <Route
            path="/job/:id"
            element={<JobPage currentJob={currentJob} onSetCurrentJob={defineCurrentJob} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
