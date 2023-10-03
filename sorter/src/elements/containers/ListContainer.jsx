import { connect } from 'react-redux';
import List from '../components/List.jsx';
import parseCards from '../../helpers/cardParser';


const mapStateToProps = (state) => {
  return parseCards(state.container);
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export default ListContainer;
