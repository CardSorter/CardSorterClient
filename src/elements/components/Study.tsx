import React, {useEffect} from 'react';

import StudyMenu from '../components/studyPageElements/StudyMenu';
import NoParticipants from './studyPageElements/NoParticipants.jsx';
import {FormattedMessage, useIntl} from "react-intl";
import {Typography} from "@material-ui/core";
import StudyContent from "../containers/StudyContentContainer";

export interface StudyState {
  isFetching: boolean,
  title: string,
  isLive: boolean,
  graphValues: any,
  tableValues: any,
  shareUrl: string,
  clustersPage: any,
  noParticipants: boolean,
  similarityPage: any,
  similarityMatrix: any,
  selectedCards: any,
  clusters: any,
  clustersFetching: boolean,
  showPopup: boolean,
  abandonedNo: number,
  completedNo: number,
}

export interface StudyDispatch {
  loadStudy: () => void,
  loadClusters: () => void,
  openPopup: () => void,
  closePopup: () => void,
  similarityHover: (i1: number, i2: number) => void,
}

const Study: React.FC<StudyState & StudyDispatch> = ({loadClusters, loadStudy, isFetching, noParticipants, shareUrl,
                                                       isLive,title, abandonedNo, completedNo}) => {
  const intl = useIntl();

  useEffect(() => {
    loadStudy();
    loadClusters();
  }, []);

  return (
    <>
      <StudyMenu/>
      <div className='content'>
        {
          isFetching || isFetching === undefined &&
          <p>Loading...</p>
        }

        {
          !isFetching && isFetching !== undefined &&
          <>
            {/* Header */}
            <span className="header">
              <Typography variant='h1'>{title}</Typography>
              {/*<button className="share" onClick={openPopup}/>*/}

              {/* Status */}
              {
                isLive &&
                <div className="active-container active">
                  <p><Typography variant='button'><FormattedMessage id='active' /></Typography></p>
                </div>
              }
              {
                !isLive &&
                <div className="active-container inactive">
                  <p><Typography variant='button'><FormattedMessage id='inactive' /></Typography></p>
                </div>
              }

              {/* Participants */}
              <div className='participants'>
                <Typography variant='subtitle1' className='completed'>{completedNo} <FormattedMessage id='completed' /></Typography>
                <Typography variant='subtitle1'>&nbsp;|&nbsp;</Typography>
                <Typography variant='subtitle1' className='abandoned'>{abandonedNo} <FormattedMessage id='abandoned' /></Typography>
              </div>
            </span>


            {
              noParticipants &&
                <NoParticipants shareUrl={shareUrl} copyUrl={() => {}}/>
            }
            {
              !noParticipants &&
                <StudyContent />
            }
          </>
        }
      </div>
    </>
  );
}

export default Study;
