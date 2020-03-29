import React from 'react';
/** Higher order component, function that accept a component, modify it and then return it */
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div className={`${size} menu-item`} onClick={ () => history.push(`${match.url}${linkUrl}`) }>
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

/** Returns a "menuItem" component with access to match and history props access */
export default withRouter(MenuItem);