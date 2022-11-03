import { FC, useCallback, useEffect, useState } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";
import JobPage from "./components/JobPage";
import MainPage from "./components/MainPage";
import { IJob } from "./types/types";

const App: FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [isDataGeted, setIsDataGeted] = useState<boolean>(false);
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

  const fetchData = useCallback(async () => {
    if (!isDataGeted) {
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
        setIsDataGeted(true);
      } else {
        alert("Something went wrong! Try again later!");
      }
      setLoading(false);
    }
  }, [isDataGeted]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                jobs={jobs}
                loading={loading}
                onToggleFavouriteJob={toggleFavouriteJob}
              />
            }
          />
          <Route
            path="/job/:id"
            element={
              <JobPage
                currentJob={currentJob}
                onSetCurrentJob={defineCurrentJob}
                fetchData={fetchData}
              />
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
