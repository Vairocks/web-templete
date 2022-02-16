import React from 'react';
import Router from './Components/Router';
import {withTranslation} from 'react-i18next';
import './Theme/index.scss';
import './Theme/index.scss';

function App(props) {
  return (
    <Router {...props} />
  );
}

export default withTranslation('translation')(App);


