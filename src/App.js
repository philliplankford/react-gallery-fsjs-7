import React, { Component } from 'react'; // default exports, { named exports }
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import axios from 'axios';

/* === COMPONENT IMPORT === */
import SearchForm from './components/SearchForm';
import MainNav from './components/MainNav';
import PhotoContainer from './components/PhotoContainer';
import Error from './components/Error';

import apiKey from './config';
import './css/index.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
      cats: [],
      dogs: [],
      computers: []
    }
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cats') => { // cats is the default query
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&extras=url_c&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => { console.log('Error fetching and parsing data', error) });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <SearchForm onSearch={this.performSearch}/>
          <MainNav />
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/cats" />}/>
            <Route path="/cats" element={<PhotoContainer results={this.state.photos} title={'cats'}/>} />
            <Route path="/dogs" element={<PhotoContainer results={this.state.photos} title={'dogs'}/>} />
            <Route path="/computers" element={<PhotoContainer results={this.state.photos} title={'computers'}/>} />
            <Route path="/search/:query" element={<PhotoContainer results={this.state.photos} title={'null'}/>} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    );
  }

}
