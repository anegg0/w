import React from "react";
import { FaCheck } from "react-icons/fa";

const EncodeStepProgressBar = ({ steps, currentStep, id }) => {
  return (
    <div id={id} className="max-w-xl mx-auto my-2 border-b-2 pb-2 w-full">
      <div className="flex w-full justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-1/4">
            <div
              className={`w-10 h-10 rounded-full text-lg text-gray flex items-center justify-center ${
                currentStep > index ? "bg-green" : "border-2 border-grey-light"
              }`}
            >
              <span className="text-center">
                {currentStep > index ? (
                  <FaCheck style={{ color: "green" }} />
                ) : (
                  index + 1
                )}
              </span>
            </div>
            <div className="text-xs mt-0.5">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncodeStepProgressBar;
