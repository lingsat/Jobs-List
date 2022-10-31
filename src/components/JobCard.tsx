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
      <img src="./assets/images/Star.svg" alt="Star" />
      <img src="./assets/images/Star.svg" alt="Star" />
      <img src="./assets/images/Star.svg" alt="Star" />
      <img src="./assets/images/Star.svg" alt="Star" />
      <img src="./assets/images/Star.svg" alt="Star" />
    </div>
  );

  return (
    <div className="card flex justify-between my-2 px-4 py-6 rounded-lg">
      <div className="card__img">
        <img src={job.pictures[0]} alt={job.name} />
      </div>
      <div className="card__content flex gap-8 justify-between">
        <div className="w-8/12">
          <Link to={`/job/${job.id}`}>
            <h2 className="card__title mb-2 text-xl font-bold">{job.title}</h2>
          </Link>
          <p className="card__text mb-2 text-base">
            Department name • {job.name}
          </p>
          <p className="card__text text-base flex gap-2">
            <img src="./assets/images/Location.svg" alt="Location" />
            {job.address}
          </p>
        </div>
        <div className="w-4/12 flex gap-8 justify-end items-center">
          {job.favourite ? starsBlock : null}
          <div className="card__data h-full flex flex-col justify-between items-end">
            <img
              className="card__icon w-4"
              src="./assets/images/To_favourite.svg"
              alt="To Favourite"
              onClick={() => onToggleFavouriteJob(job.id)}
            />
            <p className="card__text">Posted {getDateDiff()} days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
