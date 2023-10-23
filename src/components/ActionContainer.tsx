import React from "react";
import StepProgressBar from "@c/StepProgressBar";

function ActionContainer({
  steps,
  currentStep,
  id,
  actionPrompt,
  actionParagraph,
  imageSrc,
  onButtonAction,
}) {
  return (
    <div className="container">
      {/* StepProgressBar */}
      <StepProgressBar steps={steps} currentStep={currentStep} id={id} />

      {/* Action Prompt */}
      <div className="action-prompt">{actionPrompt}</div>

      {/* Action Paragraph */}
      <div className="action-paragraph">{actionParagraph}</div>

      {/* Image Preview */}
      <div className="image-preview">
        <img src={imageSrc} alt="Preview" />
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        {/* <button onClick={onButtonAction}>Button 1</button> */}
        {/* <button onClick={onButtonAction}>Button 2</button> */}
        {/* ...add as many buttons as needed */}
      </div>
    </div>
  );
}

export default ActionContainer;
