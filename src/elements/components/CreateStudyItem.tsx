// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useHistory} from 'react-router-dom';

const CreateStudyItem: React.FC = () => {

  const history = useHistory();

  return (
    <button className="btn-contained" onClick={() => history.push('/create')}>
      <i className="material-icons">add</i>
      <span>Create study</span>
    </button>
  );
};

export default CreateStudyItem;
