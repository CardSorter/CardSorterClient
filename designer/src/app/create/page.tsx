import React from "react";

import Header from "elements/containers/HeaderContainer";
import StudyCreationContainer from "elements/containers/StudyCreationContainer";

export default function Page() {
  return (
    <main>
      <Header showBackButton={true}/>
      <StudyCreationContainer history={history}/>
    </main>
  );
}