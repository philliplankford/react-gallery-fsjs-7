import React, { Component } from 'react'; // default exports, { named exports }
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
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
          { 
          this.state.loading ? <p>Loading images...</p> :
            <Switch>
              <Route exact path="/" component={ () => <Redirect to="/cats" />}/>
              <Route path="/cats" component={ () => <PhotoContainer results={this.state.photos} title={'cats'}/>} />
              <Route path="/dogs" component={ () => <PhotoContainer results={this.state.photos} title={'dogs'}/>} />
              <Route path="/computers" component={ () => <PhotoContainer results={this.state.photos} title={'computers'}/>} />
              <Route exact path="/search/:query" component={ () => <PhotoContainer results={this.state.photos} title={null}/>} />
              <Route path="*" component={ () => <Error />} />
            </Switch>
          }
        </div>
      </Router>
    );
  }

}
