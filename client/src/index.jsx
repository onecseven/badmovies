import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);

    // you might have to do something important here!
  }

  getMovies(id) {
    console.log("passing in "+id+" as id")
    axios.get(`/search?id=${id}`)
    .then(({data}) => {
      this.setState({movies: data.results});
    })
    // make an axios request to your server on the GET SEARCH endpoint
  }

  saveMovie(toFav) {
    axios
    .post("/save", { movie: toFav })
    .then(f => console.log("we heard back after favoriting"))
    .catch(e => console.error(e));
  }

  deleteMovie(deFav) {
    axios
    .post("/delete", { movie: deFav })
    .then(f => console.log("we heard back after deleting"))
    .catch(e => console.error(e));
  }

  swapFavorites() {
  //dont touch
      axios.get('/faves')
      .then(({data}) => {
        this.setState({
          favorites: data
        });        
        this.setState({
        showFaves: !this.state.showFaves
      });
      })
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search getMovies={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} deleteMovie={this.deleteMovie}  saveMovie={this.saveMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));