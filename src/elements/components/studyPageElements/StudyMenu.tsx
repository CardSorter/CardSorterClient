import React from 'react';
import {useIntl} from "react-intl";
import {useRouteMatch, useLocation, Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

const StudyMenu: React.FC = () => {
  const intl = useIntl();


  return (
    <nav id="study-menu">
      <CustomLink to='#overview'>
        <Typography variant='subtitle1'>{intl.formatMessage({id: 'overview'})}</Typography>
      </CustomLink>
      <br />
      <CustomLink to='#participants'>
        <Typography variant='subtitle1'>{intl.formatMessage({id: 'participants'})}</Typography>
      </CustomLink>
      <br />
      <CustomLink to='#cards'>
        <Typography variant='subtitle1'>{intl.formatMessage({id: 'cards'})}</Typography>
      </CustomLink>
      <br />
      <CustomLink to='#categories'>
        <Typography variant='subtitle1'>{intl.formatMessage({id: 'categories'})}</Typography>
      </CustomLink>
      <br />
      <CustomLink to='#similarity-matrix'>
        <Typography variant='subtitle1'>{intl.formatMessage({id: 'similarity_matrix'})}</Typography>
      </CustomLink>
      <br />
      <CustomLink to='#clusters'>
        <Typography variant='subtitle1'>{intl.formatMessage({id: 'clusters'})}</Typography>
      </CustomLink>
    </nav>);
};

const CustomLink: React.FC<{to: string}> = ({to, children}) => {
  const location = useLocation();

  return (
    <Link className={(location.hash === to) ? 'menu-item selected' : 'menu-item'} to={to}>{children}</Link>
  );
}

export default StudyMenu;
