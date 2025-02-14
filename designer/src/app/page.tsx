import React from "react";
import Header from "../elements/containers/HeaderContainer";
import Filters from "../elements/components/Filters";
import StudiesListContainer from "../elements/containers/StudiesListContainer";

export default function Page() {
  return (
      <main>
        <Header showBackButton={false} />
        <Filters ongoing={true} completed={true} />
        <StudiesListContainer />
      </main>
  )
}