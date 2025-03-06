import React from 'react';
import copyToClipboard from "utils/copyToClipboard";

interface PopupProps {
  title: string | undefined;
  iconClass?: string;
  url?: string;
  close: () => void;
}

const Popup: React.FC<PopupProps> = ({title, iconClass, url, close}) => {

  function onCopy() {
    copyToClipboard(url || "");
  }

  return (
    <div className="popup-container" onClick={close}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          {iconClass && <span className="material-symbols-outlined">{iconClass}</span>}
          <h2>{title}</h2>
          <button className="close-btn" onClick={close}>&#10005;</button>
        </div>
        <div className="content">
          {url &&
            <div className="share-container">
              <div className="url-container">
                <a className="url" href={url} target="_blank" >{url}</a>
                <button className="copy" type="button" onClick={onCopy}>
                    <span className="material-symbols-outlined">content_copy</span>
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Popup;


