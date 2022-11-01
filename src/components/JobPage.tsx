import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IJob } from "../types/types";
import './JobPage.css';

interface JopPageProps {
  currentJob: IJob | undefined;  
  onSetCurrentJob: (id: string | undefined) => void;
}

const JobPage: FC<JopPageProps> = ({currentJob, onSetCurrentJob}) => {
  let { id } = useParams();

  useEffect(() => {
    onSetCurrentJob(id);
  }, [id, onSetCurrentJob]);

  return (
    <main className="max-container mx-auto p-3 sm:p-5 flex gap-20">
      <div className="job__content w-4/6">
        <div className="job__header mb-10 flex flex-wrap gap-2 justify-between">
          <h2 className="main__title text-2xl font-bold">Job Details</h2>
          <div className="flex gap-6">
            <button className="header_controls flex items-center gap-4">
              <img className="w-4" src="../assets/images/To_favourite.svg" alt="Favourite" />
              Save to my list
            </button>
            <button className="header_controls flex items-center gap-4">
              <img className="w-4" src="../assets/images/Share.svg" alt="Share" />                
              Share
            </button>
          </div>
          <div className="line"></div>
        </div>
        <button className="job__btn px-7 py-4 rounded-md text-xs mb-8">APPLY NOW</button>
        <div className="mb-2 flex flex-wrap justify-between">
          <h2 className="job__title mb-2 w-4/6 text-2xl font-bold leading-7">{ currentJob?.title }</h2>
          <div className="job__salary">
            <p className="text-xl font-bold leading-6">&euro; { currentJob?.salary.replaceAll('k', ' 000') }</p>
            <span className="text-lg leading-6">Brutto, per year</span>
          </div>
          <p className="job__posted w-full text-lg leading-6">Posted 2 days ago</p>
        </div>
        <p className="job__text text-lg leading-6">{ currentJob?.description.split('Responsopilities:')[0] }</p>
        <h3 className="mt-6 mb-2 text-xl leading-6 font-bold">Responsopilities</h3>
        <p className="job__text text-lg leading-6">{ currentJob?.description.split('Responsopilities:')[1].split('Compensation & Benefits:')[0] }</p>
        <h3 className="mt-6 mb-2 text-xl leading-6 font-bold">Compensation & Benefits:</h3>
        <p className="job__text text-lg leading-6">{ currentJob?.description.split('Responsopilities:')[1].split('Compensation & Benefits:')[1] }</p>
        <button className="job__btn mt-10 mb-20 px-7 py-4 rounded-md text-xs">APPLY NOW</button>
        <div className="job__header mb-3">
          <h2 className="main__title mb-2 text-2xl font-bold">Additional info</h2>         
          <div className="line"></div>
        </div>
        <h5 className="mb-2 text-lg leading-6">Employment type</h5>
        <div className="mb-6 flex flex-wrap gap-2">
          { currentJob?.employment_type.map(type => {
            return (
              <div className="job__type py-4 rounded-lg text-center text-base leading-4 font-bold">{type}</div>
            );
          }) }
        </div>
        <h5  className="mb-2 text-lg leading-6">Benefits</h5>
        <div className="mb-20 flex flex-wrap gap-2">
          { currentJob?.benefits.map(benefit => {
            return (
              <div className="job__benefit py-4 rounded-lg text-center text-base leading-4 font-bold">{benefit}</div>
            );
          }) }
        </div>
        <div className="job__header mb-3">
          <h2 className="main__title mb-2 text-2xl font-bold">Attached images</h2>         
          <div className="line mb-5"></div>
        </div>
        <div className="flex gap-2">
          {currentJob?.pictures.map(picture => {
            return(
              <img className="job__image rounded-lg" src={picture} alt={currentJob.name} />
            )
          })}
        </div>
      </div>
      <div className="job__contacts w-2/6">2</div>
    </main>
  );
}

export default JobPage;