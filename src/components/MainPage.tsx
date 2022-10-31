import { FC } from "react";
import { IJob } from "../types/types";
import JobCard from "./JobCard";

interface MainPageProps {
  jobs: IJob[];
  onToggleFavouriteJob: (id: string) => void;
}

const MainPage: FC<MainPageProps> = ({ jobs, onToggleFavouriteJob }) => {
  return (
    <main className="max-container mx-auto px-5 py-6">
      {jobs.map((job: IJob) => {
        return <JobCard key={job.id} job={job} onToggleFavouriteJob={onToggleFavouriteJob} />;
      })}
    </main>
  );
};

export default MainPage;
