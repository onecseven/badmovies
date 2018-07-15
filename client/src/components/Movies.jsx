import React from "react";
import axios from "axios";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shadow: false
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(toFav) {
    if (!this.props.showFaves) {
      this.props.saveMovie(toFav);
    } else{
      this.props.deleteMovie(toFav);
    }
    // Make an onClick for each list item. If the movies shown is the search results,
    // onClick add it to the database (do it in the main app, and pass down the function)

    // If you're currently showing the fave list, delete the movie instead
    // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)
  }
  render() {
    return (
      <ul className="movies">
        {this.props.movies.map(movie => {
          return (
            <li onClick={e =>{
              this.onClick(movie)
              if(this.props.showFaves) e.target.className = 'hidden';
            } }>
              <div className="title movies  movie_item">
                <img
                  src={`http://image.tmdb.org/t/p/w185//${movie.poster_path || movie.poster}`}
                />
                <h3>{movie.title}</h3>
                <section className="movie_details">
                  <div className="movie_year">
                    <span className="title">Year</span>
                    <span>{movie.release_date || movie.year}</span>
                  </div>
                  <div className="movie_rating">
                    <span className="title">Rating</span>
                    <span>{movie.popularity}</span>
                  </div>
                </section>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Movies;
