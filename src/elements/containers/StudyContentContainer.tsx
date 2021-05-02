import React from "react";
import StudyContent, {StudyContentState} from "../components/StudyContent";
import {connect} from "react-redux";
import {CardSorterState} from "../../State";

function mapStateToProps(state: CardSorterState): StudyContentState {
  return {
    avgSort: state.study.cards.average,
    completion: state.study.participants.completion,
    similarity: state.study.categories.similarity,
  }
}

function mapDispatchToProps() {

}

export default connect(mapStateToProps, mapDispatchToProps)(StudyContent);