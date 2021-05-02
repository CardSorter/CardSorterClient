import {connect} from 'react-redux';

import Studies, {StudiesState} from '../components/Studies';
import {CardSorterState} from "../../State";
import {Dispatch} from "redux";

const mapStateToProps = (state: CardSorterState): StudiesState => {
  return {
    studies: state.studies.studies,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps,)(Studies);
