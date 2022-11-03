import { FC } from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  jobsPerPage: number;
  totalJobs: number;
  onPaginate: (number: number) => void;
  onDecreasePage: () => void;
  onIncreasePage: () => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  jobsPerPage,
  totalJobs,
  onPaginate,
  onDecreasePage,
  onIncreasePage
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="py-5 sm:py-10">
      <ul className="max-w-fit flex justify-center items-center gap-2 mx-auto px-5 rounded-lg">
        <button className="btn__prev py-1 px-2 mr-10 relative hover:opacity-70" onClick={onDecreasePage}>
          <img src="../assets/images/Prev.svg" alt="Previous" />
        </button>
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <button
                className={`btn py-2 px-2 text-xl leading-6 font-bold ${currentPage === number && 'active'}`}
                onClick={() => onPaginate(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
        <button className="btn__next py-1 px-2 ml-10 relative hover:opacity-70" onClick={onIncreasePage}>
          <img src="../assets/images/Next.svg" alt="Next" />
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
