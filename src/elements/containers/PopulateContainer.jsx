import {connect} from 'react-redux';
import Container from '../components/Container.jsx';
import parseCards from '../../helpers/cardParser';


const mapStateToProps = (state) => {
  return parseCards(state.container);
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const PopulateContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Container);

export default PopulateContainer;
