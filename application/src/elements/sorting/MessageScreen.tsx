import React from 'react';
import copyToClipboard from "utils/copyToClipboard";
import Image from "next/image";
import {useTranslations} from "next-intl";

interface MessageScreenProps {
  message: string,
  link?: string,
  image: string,
  subMessage?: string,
}

const MessageScreen: React.FC<MessageScreenProps> = ({message, link, image, subMessage}) => {
  const t = useTranslations("SortingPage");

  if (link) {
    link = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;
  }

  return (

    <div className="message-screen" >
      <h1 id="logo">Card Sorter</h1>
      <Image src={image} alt='Study not found' width={150} height={150} />

      <h2>{message}</h2>
      <br></br>
      {link &&
        <div className="share-container">
          <p>{t("questionnaire")}</p>
          <div className="url-container">
            <a className="url" href={link} target="_blank">{link}</a>

            <button className="copy" type="button" onClick={() => copyToClipboard(link)}></button>
          </div>
        </div>
      }

      <br/>
      <h3>{subMessage}</h3>
    </div >
  );
};

export default MessageScreen;
