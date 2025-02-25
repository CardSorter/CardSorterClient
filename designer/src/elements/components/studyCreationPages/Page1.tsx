import React, {useRef} from 'react';
import Link from "next/link";

import L from 'localization/LocalizedText';

export interface Page1PropsState {
  values: {
    title: string;
    description: string;
  };
  errors: {
    title?: string;
    description?: string;
  };
}

export interface Page1PropsDispatch {
  dispatch: {
    onChange: (field: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onNext: (title: string, description: string) => void;
    onPrev: () => void;
    onLocalStorage: (title: string, description: string) => void;
  };
}

export default function Page1({values, errors, dispatch}: Page1PropsState & Page1PropsDispatch) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default Enter behavior (form submission)

      if (e.target === titleInputRef.current) {
        descriptionInputRef.current?.focus();
      }
    }
  };

  if (localStorage.getItem('newTitle') !== null && localStorage.getItem('newDescription') !== null) {
    values.title = localStorage.getItem('newTitle') || "";
    values.description = localStorage.getItem('newDescription') || "";
    dispatch.onLocalStorage(values.title, values.description);
  }

  localStorage.removeItem('newTitle');
  localStorage.removeItem('newDescription');

  return (
    <div className='study-creation-card'>
      <h1>{L?.text?.createStudy}</h1>
      <h2>{L?.text?.basicInformation}</h2>

      <form>
        <div className="error-holder">
          <input
            ref={titleInputRef}
            type='text'
            placeholder={L?.text?.title}
            defaultValue={values.title}
            onChange={(e) => dispatch.onChange('title', e)}
            onKeyDown={handleEnterKey} // Handle Enter key here
          />
          {errors.title && <div className="error-message"><p>{L?.text?.fillMeOut}</p></div>}
        </div>
        <div className="error-holder">
          <textarea
            ref={descriptionInputRef}
            placeholder={L?.text?.description}
            defaultValue={values.description}
            rows={10}
            cols={30}
            onChange={(e) => dispatch.onChange('description', e)}
          ></textarea>
          {errors.description && <div className="error-message"><p>{L?.text?.fillMeOut}</p></div>}
        </div>
      </form>
      <div className="bottom-container">
        <div className="btn-container">
          <button className="prev disabled" onClick={dispatch.onPrev}></button>
          <button className="next" onClick={() => dispatch.onNext(values.title, values.description)}></button>
        </div>
        <div className="page-no-container">
          <p>1</p>
          <p>{L?.text?.of}</p>
          <p>3</p>
        </div>
      </div>
    </div>
  );
};
