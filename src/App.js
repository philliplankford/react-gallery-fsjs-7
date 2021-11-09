import React, { Component } from 'react';

import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';

import './css/index.css';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        
        <SearchForm />
        <MainNav />
        <PhotoContainer />
        {/* Not Found */}

      </div>
    );
  }

}
