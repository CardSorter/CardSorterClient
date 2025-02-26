"use client"

import React, {useEffect, useRef} from 'react';

import L from 'localization/LocalizedText';
import Image from "next/image";
import {useSelector} from "react-redux";
import StateSchema from "../../../reducers/StateSchema";
import {useRouter} from "next/navigation";

export default function Page() {
  const urlRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  // State
  const createdStudy = useSelector((state: StateSchema) => (state.studyCreation.createdStudy))

  const onCopy = () => {
    const input = document.createElement('input');
    input.value = urlRef?.current?.href || "";
    document.body.appendChild(input);

    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(input.value).then(() => {
      document.body.removeChild(input);
    });
  }

  const onButtonClick = () => {
    router.push(`/study/${createdStudy?.id}`)
  }

  useEffect(() => {
    // Redirect to previous step if study not yet sent
    if (!createdStudy?.id) {
      router.push("/create/final");
    }
  }, [router, createdStudy?.id]);

  return (
    <div className="success-page">
      <h1>{L?.text?.studyCreated}</h1>
      <Image src={"/images/success.svg"} alt={"Study Created"} height={150} width={150} />
      <div className="actions-container">
        <div className="button-container">
          <button onClick={onButtonClick}>Go to study</button>
        </div>
        <div className="share-container">
          <div className="url-container">
            <a className="url" ref={urlRef} href={`/sort/${createdStudy?.id}`} target="_blank">
              {urlRef?.current?.href || ""}
            </a>
            <button className="copy" type="button" onClick={onCopy}></button>
          </div>
          <p>{L?.text?.shareThisUrlWithTheParticipants}</p>
        </div>
      </div>
    </div>
  );
};
