import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IJob } from "../types/types";
import moment from "moment";
import LoadinSpinner from "./LoadingSpinner/LoadingSpinner";
import Map from "./Map/Map";
import "./JobPage.css";

interface JopPageProps {
  currentJob: IJob | undefined;
  onSetCurrentJob: (id: string | undefined) => void;
  fetchData: () => void;
}

const JobPage: FC<JopPageProps> = ({
  currentJob,
  onSetCurrentJob,
  fetchData,
}) => {
  let { id } = useParams();

  useEffect(() => {
    fetchData();
    onSetCurrentJob(id);
  }, [fetchData]);

  if (currentJob === undefined) {
    return <LoadinSpinner />;
  }

  return (
    <>
      <main className="max-container mx-auto mb-6 sm:mb-10 lg:mb-16 p-3 sm:p-5 flex flex-wrap lg:flex-nowrap justify-between items-start lg:gap-20">
        <div className="job__content w-full lg:w-4/6">
          <div className="job__header mb-7 flex flex-wrap flex-col sm:flex-row gap-2 justify-between">
            <h2 className="main__title order-1 text-2xl font-bold">
              Job Details
            </h2>
            <div className="flex order-3 sm:order-2 gap-6">
              <button className="header_controls flex items-center gap-4 hover:opacity-60">
                <img
                  className="w-4"
                  src="../assets/images/To_favourite.svg"
                  alt="Favourite"
                />
                Save to my list
              </button>
              <button className="header_controls flex items-center gap-4 hover:opacity-60">
                <img
                  className="w-4"
                  src="../assets/images/Share.svg"
                  alt="Share"
                />
                Share
              </button>
            </div>
            <div className="line mb-3 order-2 sm:order-3"></div>
          </div>
          <button className="job__btn hidden md:block px-7 py-4 rounded-md text-xs mb-8">
            APPLY NOW
          </button>
          <div className="mb-2 flex flex-wrap justify-between items-center sm:items-start">
            <h2 className="job__title order-1 mb-2 sm:w-4/6 text-2xl font-bold leading-7">
              {currentJob?.title}
            </h2>
            <div className="job__salary flex flex-col-reverse sm:flex-col order-3 sm:order-2 w-1/2 sm:w-auto text-right sm:text-left">
              <p className="text-xl font-bold leading-6">
                &euro; {currentJob?.salary.replaceAll("k", " 000")}
              </p>
              <span className="text-lg leading-6">Brutto, per year</span>
            </div>
            <p className="job__posted order-2 sm:order-3  w-1/2 sm:w-full text-sm sm:text-lg leading-6">
              Posted {moment(currentJob?.createdAt).fromNow()}
            </p>
          </div>
          <p className="job__text text-lg leading-6">
            {currentJob?.description.split("Responsopilities:")[0]}
          </p>
          <h3 className="mt-6 mb-2 text-xl leading-6 font-bold">
            Responsopilities
          </h3>
          <p className="job__text text-lg leading-6">
            {
              currentJob?.description
                .split("Responsopilities:")[1]
                .split("Compensation & Benefits:")[0]
            }
          </p>
          <h3 className="mt-6 mb-2 text-xl leading-6 font-bold">
            Compensation & Benefits:
          </h3>
          <p className="job__text text-lg leading-6">
            {
              currentJob?.description
                .split("Responsopilities:")[1]
                .split("Compensation & Benefits:")[1]
            }
          </p>
          <button className="job__btn block mx-auto md:mx-0 mt-7 md:mt-10 mb-20 px-7 py-4 rounded-md text-xs">
            APPLY NOW
          </button>
          <div className="flex flex-col-reverse sm:flex-col">
            <div className="job__info">
              <div className="job__header mb-3">
                <h2 className="main__title mb-2 text-2xl font-bold">
                  Additional info
                </h2>
                <div className="line"></div>
              </div>
              <h5 className="mb-2 text-lg leading-6">Employment type</h5>
              <div className="mb-6 flex flex-wrap gap-2">
                {currentJob?.employment_type.map((type) => {
                  return (
                    <div
                      key={type}
                      className="job__type py-4 rounded-lg text-center text-base leading-4 font-bold"
                    >
                      {type}
                    </div>
                  );
                })}
              </div>
              <h5 className="mb-2 text-lg leading-6">Benefits</h5>
              <div className="sm:mb-20 flex flex-wrap gap-2">
                {currentJob?.benefits.map((benefit) => {
                  return (
                    <div
                      key={benefit}
                      className="job__benefit py-4 rounded-lg text-center text-base leading-4 font-bold"
                    >
                      {benefit}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="job__images mb-14 sm:mb-0">
              <div className="job__header mb-3">
                <h2 className="main__title mb-2 text-2xl font-bold">
                  Attached images
                </h2>
                <div className="line mb-5"></div>
              </div>
              <div className="flex gap-2">
                {currentJob?.pictures.map((picture, index) => {
                  return (
                    <img
                      key={index}
                      className="job__image rounded-lg"
                      src={picture}
                      alt={currentJob.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="job__header mt-14 sm:mt-20 lg:hidden w-full">
          <h2 className="main__title mb-2 text-2xl font-bold">Contacts</h2>
          <div className="line mb-5"></div>
        </div>
        <div className="job__contacts w-full sm:w-2/3 md:w-1/2 lg:w-2/6 rounded-lg overflow-hidden">
          <div className="px-14 py-7 lg:px-7 lg:py-4 xl:px-14 xl:py-7">
            <p className="mb-0 sm:mb-1 text-base sm:text-xl leading-5 sm:leading-6 font-bold">
              Department name.
            </p>
            <p className="mb-3 text-base sm:text-xl leading-5 sm:leading-6 font-bold">
              {currentJob?.name}
            </p>
            <p className="mb-2 text-base sm:text-lg leading-5 sm:leading-6">
              <img
                className="inline mr-2 -mt-1"
                src="../assets/images/Location.svg"
                alt="Location"
              />
              {currentJob?.address}
            </p>
            <p className="text-base sm:text-lg leading-5 sm:leading-6">
              {currentJob?.phone},
            </p>
            <p className="text-base sm:text-lg leading-5 sm:leading-6">
              {currentJob?.email}
            </p>
          </div>

          <div className="h-52 w-full text-center">
            <Map
              lat={currentJob?.location.lat!}
              lng={currentJob?.location.long!}
            />
          </div>
        </div>
      </main>
      <div className="hidden sm:block max-w-screen-2xl mx-auto mb-12 px-5">
        <Link
          to="/"
          className="back__btn px-6 py-4 rounded-lg text-xs font-semibold"
        >
          <img
            className="inline mr-4"
            src="../assets/images/Arrow_left.svg"
            alt="Left Arrow"
          />
          RETURN TO JOB BOARD
        </Link>
      </div>
    </>
  );
};

export default JobPage;
