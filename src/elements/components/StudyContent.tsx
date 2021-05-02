import React from 'react';
import {Typography} from "@material-ui/core";
import {FormattedMessage, useIntl} from "react-intl";

export interface StudyContentState {
  completion: string,
  avgSort: string,
  similarity: string,
}

export interface StudyContentDispatch {

}

const StudyContent: React.FC<StudyContentState & StudyContentDispatch> = ({avgSort, completion, similarity}) => {
  const intl = useIntl();

  return (
    <div className='mt-xl'>
      {/*{*/}
      {/*  showPopup &&*/}
      {/*  <Popup title={intl.formatMessage({id: 'shareThisUrlWithTheParticipants'})} url={shareUrl}*/}
      {/*         icon={PopupIcon} iconAlt={intl.formatMessage({id: 'sharingGraph'})}*/}
      {/*         close= {closePopup}/>*/}
      {/*}*/}
      {/*<Dendrogram data={clusters} fetcing={clustersFetching}/>*/}
      {/*<SimilarityMatrix data={similarityMatrix} onHover={similarityHover} selected={selectedCards}/>*/}
      {/*<BarGraph percentage={graphValues.percentage}*/}
      {/*          sub={graphValues.sub}*/}
      {/*          total={graphValues.total} entity={graphValues.entity}*/}
      {/*          title={graphValues.title} action={graphValues.action}/>*/}
      {/*<DataTable headers={tableValues.headers} data={tableValues.data}/>*/}
      <Typography variant='h2'><FormattedMessage id='overview' /></Typography>

      <div id='overview'>

      </div>

      <div id='participants'>

      </div>

      <div id='cards'>

      </div>

      <div id='categories'>

      </div>

      <div id='similarity_matrix'>

      </div>

      <div id='clusters'>

      </div>
    </div>
  );
}

export default StudyContent;