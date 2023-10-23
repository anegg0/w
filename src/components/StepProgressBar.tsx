import React from "react";
import { FaCheck } from "react-icons/fa";

const StepProgressBar = ({ steps, currentStep, id }) => {
  return (
    <div id={id} className="max-w-xl mx-auto my-4 border-b-2 pb-4">
      <div className="flex pb-3">
        <div className="flex-1"></div>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex-1">
              <div
                className={`w-10 h-10 mx-auto rounded-full text-lg text-gray flex items-center ${
                  currentStep > index
                    ? "bg-green"
                    : "border-2 border-grey-light"
                }`}
              >
                <span className="text-gray text-center w-full">
                  {currentStep > index ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    index + 1
                  )}
                </span>
              </div>
            </div>
            {index !== steps.length - 1 && (
              <div className="w-1/6 align-center items-center align-middle content-center flex">
                <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                  <div
                    className="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded"
                    style={{
                      width: `${
                        currentStep > index + 1
                          ? 100
                          : currentStep === index + 1
                          ? 20
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        <div className="flex-1"></div>
      </div>

      <div className="flex text-xs content-center text-center">
        {steps.map((label, index) => (
          <div key={index} className="w-1/4">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgressBar;
