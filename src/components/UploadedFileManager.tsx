"use client";
import React, { useState } from "react";
import { existsSync } from "fs";
import { notFound } from "next/navigation";
import path from "path";


export default async function PlayerPage({
  searchParams: { filename },
}: {
  searchParams: { filename: string };
}) {
  if (!filename) {
    notFound();
  }
  const filePath = path.join(process.cwd(), process.env.STORE_PATH!, filename);

  if (!existsSync(filePath)) {
    notFound();
  }

  const [step, setStep] = useState(1);
  const [extension, ...name] = filename.split(".").reverse();

  if (!["mp4"].includes(extension.toLowerCase())) {
    notFound();
  }

  const [step, setStep] = useState(1);

  const url = `/api/file/${filename}`;
  console.log(url);

  return (
    <>
      <div>{url}</div>
    </>
  );
}
