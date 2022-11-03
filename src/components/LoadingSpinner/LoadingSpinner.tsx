import { FC } from "react";
import "./LoadingSpinner.css";

const LoadinSpinner: FC = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadinSpinner;
