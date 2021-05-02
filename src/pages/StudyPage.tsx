import React from 'react';
import Header from '../elements/containers/HeaderContainer';
import StudyContainer from '../elements/containers/StudyContainer';
import {RouteComponentProps} from "react-router-dom";
import {RouterStudyMatch} from "../index";

const StudyPage: React.FC<RouteComponentProps<RouterStudyMatch>> = ({match}) => {
  return (
    <>
      <Header showBackButton={true}/>
      <main id='study-page'>
        <StudyContainer id={match.params.id}/>
      </main>
    </>
  );
};

export default StudyPage;
