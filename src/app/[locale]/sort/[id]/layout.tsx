"use client"

import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "i18n/navigation";
import Header from "elements/sorting/Header";
import StateSchema from "reducers/StateSchema";

export default function Layout({children}: {children: React.ReactNode }) {
  const router = useRouter();

  // State
  const notFound = useSelector((state: StateSchema) => state.sortingBoard.notFound);
  const thanksMessage = useSelector((state: StateSchema) => state.sortingUi.thanksMessage);

  // Redirect to not found
  useEffect(() => {
    if (notFound) {
      router.push('/sort/not-found');
    }
    if (thanksMessage) {
      router.push('/sort/thank-you');
    }
  }, [notFound, thanksMessage]);

  return (
    <>
      <Header />
      {children}
    </>
  )
}