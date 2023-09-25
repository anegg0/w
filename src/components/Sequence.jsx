import React, { useState } from "react";
import Image from "next/image";
import Upload from "./Upload"; // Replace with your Upload component

export function Sequence() {
  // const [step, setStep] = useState(1);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-4 ">
        <div className="mb-4 text-2xl font-bold rounded-lg">
          {"Get started by uploading your file (PNG)"}
        </div>
        <Upload />
      </div>
    </div>
  );
}
