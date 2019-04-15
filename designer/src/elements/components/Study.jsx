import React, {Component} from 'react';
import PropTypes from 'prop-types';

import StudyMenu from '../components/studyPageElements/StudyMenu.jsx';
import DataTable from '../components/studyPageElements/DataTable.jsx';
import BarGraph from '../components/studyPageElements/BarGraph.jsx';
import L from '../../localization/LocalizedText';

/**
 * 
 */
class Study extends Component {
  /**
   *
   */
  componentDidMount() {
    this.props.loadStudy();
  }

  /**
   *
   * @return {ReactDOM}
   */
  render() {
    const {isFetching, title, isLive, launched, menuValues,
      menuDispatch, graphValues, tableValues, tableDispatch} = this.props;

    if (isFetching || isFetching === undefined) {
      return <p>Loading...</p>;
    }

    return (
      <div className="study-page">
        <span className="header">
          <h1>{title}</h1>
          <button className="edit"></button>
        </span>
        <span className="active">
          {
            isLive &&
            <div className="active-container">
              <span className='activeSquare isLive'></span>
              <p>{L.text.active}</p>
            </div>
          }
          {
            !isLive &&
            <div className="active-container">
              <span className='activeSquare notLive'></span>
              <p>{L.text.inactive}</p>
            </div>
          }
          <h2 className="date">{L.text.launchedOn} {launched.getDate()} {
            launched.getMonth()} {launched.getFullYear()}</h2>
        </span>
        <StudyMenu selectedNo={menuValues.selectedNo} onClicks=
          {menuDispatch.onClicks}/>
        <div className="content">
          <BarGraph percentage={graphValues.percentage} sub={graphValues.sub}
            total={graphValues.total} entity={graphValues.entity}
            action={graphValues.action}/>
          <DataTable headers={tableValues.headers} data={tableValues.data}/>
        </div>
      </div>
    );
  };
}

Study.propTypes = {
  title: PropTypes.string.isRequired,
  isLive: PropTypes.bool.isRequired,
  launched: PropTypes.objectOf(Date).isRequired,
  menuValues: PropTypes.object.isRequired,
  menuDispatch: PropTypes.object.isRequired,
  graphValues: PropTypes.object.isRequired,
  tableValues: PropTypes.object.isRequired,
  tableDispatch: PropTypes.object.isRequired,
};

export default Study;
