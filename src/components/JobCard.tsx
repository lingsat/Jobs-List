import { FC } from "react";
import { Link } from "react-router-dom";
import { IJob } from "../types/types";
import "./JobCard.css";

interface JobCardProps {
  job: IJob;
  onToggleFavouriteJob: (id: string) => void;
}

const JobCard: FC<JobCardProps> = ({ job, onToggleFavouriteJob }) => {
  const getDateDiff = (): number => {
    const diff: number =
      (new Date().getTime() - new Date(job.createdAt).getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.round(diff);
  };

  const starsBlock = (
    <div className="card__stars flex justify-center">
      <img className="w-3 sm:w-5" src="./assets/images/Star.svg" alt="Star" />
      <img className="w-3 sm:w-5" src="./assets/images/Star.svg" alt="Star" />
      <img className="w-3 sm:w-5" src="./assets/images/Star.svg" alt="Star" />
      <img className="w-3 sm:w-5" src="./assets/images/Star.svg" alt="Star" />
      <img className="w-3 sm:w-5" src="./assets/images/Star.svg" alt="Star" />
    </div>
  );

  return (
    <div className="card flex justify-between my-2 px-4 py-4 sm:py-6 rounded-lg">
      <div className="card__img mt-8 sm:mt-9 md:mt-0">
        <img src={job.pictures[0]} alt={job.name} />
      </div>
      <div className="card__content flex flex-col-reverse md:flex-row justify-between">
        <div className="md:w-1/2 lg:w-7/12 xl:w-8/12">
          <Link to={`/job/${job.id}`}>
            <h2 className="card__title mb-2 text-lg leading-6 sm:text-xl sm:font-bold">
              {job.title}
            </h2>
          </Link>
          <p className="card__text mb-2 text-base">
            Department name • {job.name}
          </p>
          <p className="card__text text-base flex gap-2">
            <img src="./assets/images/Location.svg" alt="Location" />
            {job.address}
          </p>
        </div>
        <div className="md:w-1/2 lg:w-5/12 xl:w-4/12 mb-3 md:mb-0 flex gap-3 sm:gap-8 md:justify-end items-center">
          {!job.favourite ? starsBlock : null}
          <div className="card__data ml-auto md:ml-0 h-full flex flex-row-reverse md:flex-col justify-between items-center md:items-end">
            <img
              className="card__icon w-4 hidden sm:block ml-4"
              src="./assets/images/To_favourite.svg"
              alt="To Favourite"
              onClick={() => onToggleFavouriteJob(job.id)}
            />
            <p className="card__text text-sm sm:text-base">
              Posted {getDateDiff()} days ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
