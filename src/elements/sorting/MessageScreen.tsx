import React from 'react';
import copyToClipboard from "utils/copyToClipboard";
import Image from "next/image";
import {useTranslations} from "next-intl";

interface MessageScreenProps {
  message: string,
  link?: string,
  success: boolean,
  subMessage?: string,
}

const MessageScreen: React.FC<MessageScreenProps> = ({message, link, success, subMessage}) => {
  const t = useTranslations("SortingPage");
  const hasValidLink = link && link.trim() !== "";

  if (hasValidLink && !(link!.startsWith('http://') || link!.startsWith('https://'))) {
    link = `http://${link}`;
  }

  return (

    <div className="message-screen">
      <h1 className="logo">Card Sorter</h1>

      {
        success &&
          <div className="success-ribbon">
            <span className="material-symbols-outlined">check_circle</span>
            <p>Study submitted</p>
          </div>
      }

      {
        !success &&
          <Image src="/card-sorter/images/not-found.svg" alt='Study not found' width={300} height={300} />
      }

      <h2>{message}</h2>
      {hasValidLink &&
          <div className="share-container">
              <p>{t("questionnaire")}</p>
              <div className="url-container">
                  <a className="url" href={link!} target="_blank">{link}</a>

                  <button className="copy" type="button" onClick={() => copyToClipboard(link!)}></button>
              </div>
          </div>
      }
      <h3>{subMessage}</h3>
    </div>
  );
};

export default MessageScreen;
