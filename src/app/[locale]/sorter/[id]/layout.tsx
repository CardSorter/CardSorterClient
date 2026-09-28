"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "i18n/navigation";
import GamifiedSortingHeader from "elements/sorting/GamifiedSortingHeader/GamifiedSortingHeader";
import StateSchema from "reducers/StateSchema";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // State
  const notFound = useSelector(
    (state: StateSchema) => state.sortingBoard.notFound,
  );
  const thanksMessage = useSelector(
    (state: StateSchema) => state.sortingUi.thanksMessage,
  );

  // Redirect to not found
  useEffect(() => {
    if (notFound) {
      router.push("/sorter/not-found");
    }
    if (thanksMessage) {
      router.push("/sorter/thank-you");
    }
  }, [notFound, thanksMessage]);

  return (
    <>
      <GamifiedSortingHeader />
      {children}
    </>
  );
}
