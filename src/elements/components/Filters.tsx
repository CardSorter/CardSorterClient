import React from 'react';
import {FormattedMessage} from "react-intl";
import {Button, Typography} from "@material-ui/core";

export enum FilterTypes {
  ONGOING,
  COMPLETED,
}

export interface FiltersState {
  currentFilters: FilterTypes[],
}

const Filters: React.FC<FiltersState> = ({currentFilters}) => {

  return (
    <div className="filter-container mb-xs">
      <Typography variant='subtitle2'>
        <FormattedMessage id='filter' />
      </Typography>

      <Button className='ml-xs' disabled><FormattedMessage id='ongoing' /></Button>
      <Button disabled><FormattedMessage id='completed'/></Button>
    </div>
  );
};

export default Filters;
