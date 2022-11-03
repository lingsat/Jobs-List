import { FC, useState } from "react";
import { IJob } from "../types/types";
import JobCard from "./JobCard";
import Pagination from "./Pagination";

interface MainPageProps {
  jobs: IJob[];
  loading: boolean;
  onToggleFavouriteJob: (id: string) => void;
}

const MainPage: FC<MainPageProps> = ({
  jobs,
  loading,
  onToggleFavouriteJob,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage: number = 15;

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (number: number): void => {
    setCurrentPage(number);
  };

  const decreasePage = (): void => {
    setCurrentPage((prevPageNum) => {
      if (prevPageNum <= 1) {
        return Math.ceil(jobs.length / jobsPerPage);
      } else {
        return prevPageNum - 1;
      }
    });
  };

  const increasePage = (): void => {
    setCurrentPage((prevPageNum) => {
      if (prevPageNum >= Math.ceil(jobs.length / jobsPerPage)) {
        return 1;
      } else {
        return prevPageNum + 1;
      }
    });
  };

  if (loading) {
    return (
      <h2 className="text-xl text-center px-3 py-1 sm:px-5 sm:py-3">
        Loading...
      </h2>
    );
  }

  return (
    <main className="max-container mx-auto px-3 py-1 sm:px-5 sm:py-3">
      {currentJobs.map((job: IJob) => {
        return (
          <JobCard
            key={job.id}
            job={job}
            onToggleFavouriteJob={onToggleFavouriteJob}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        jobsPerPage={jobsPerPage}
        totalJobs={jobs.length}
        onPaginate={paginate}
        onDecreasePage={decreasePage}
        onIncreasePage={increasePage}
      />
    </main>
  );
};

export default MainPage;
