"use client";

import React, { useState, useEffect } from "react";
import copyToClipboard from "utils/copyToClipboard";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Confetti from "react-confetti";
import IconButton from "@mui/material/IconButton";

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

interface MessageScreenProps {
  message: string;
  link?: string;
  success: boolean;
  subMessage?: string;
  results: any;
}

const GamifiedMessageScreen: React.FC<MessageScreenProps> = ({
  message,
  link,
  success,
  subMessage,
  results,
}) => {
  const t = useTranslations("SortingPage");
  const hasValidLink = link && link.trim() !== "";

  if (
    hasValidLink &&
    !(link!.startsWith("http://") || link!.startsWith("https://"))
  ) {
    link = `http://${link}`;
  }
  const { width, height } = useWindowSize();

  let categoriesCount = 0;
  if (results) {
    categoriesCount = Object.keys(results as Record<string, any>).length;
  }
  return (
    <div className="message-screen">
      <h1 className="logo">Card Sorter</h1>
      {success && <Confetti width={width} height={height} />}
      {success && (
        <div className="success-submitted">
          <span className="material-symbols-outlined">check_circle</span>
          <p>Study submitted</p>
        </div>
      )}

      {!success && (
        <Image
          src="/card-sorter/images/not-found.svg"
          alt="Study not found"
          width={300}
          height={300}
        />
      )}

      <h2>{message}</h2>
      {success && results && (
        <div className="results">
          You created{" "}
          <span className="results-count">
            {" "}
            {categoriesCount}{" "}
            {categoriesCount === 1 ? "category" : "categories"}
          </span>
          !
        </div>
      )}

      {hasValidLink && (
        <div className="share-container">
          <p>{t("questionnaire")}</p>
          <div className="url-container">
            <a className="url" href={link!} target="_blank">
              {link}
            </a>

            <IconButton
              className="copy"
              aria-label="Copy link"
              onClick={() => copyToClipboard(link!)}
              edge="end"
            >
              <span className="material-symbols-outlined">content_copy</span>
            </IconButton>
          </div>
        </div>
      )}
      <h3 className="sub-message">{subMessage}</h3>
    </div>
  );
};

export default GamifiedMessageScreen;
