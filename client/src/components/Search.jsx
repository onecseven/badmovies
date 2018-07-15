import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [
        {
          id: 28,
          name: "Action"
        },
        {
          id: 12,
          name: "Adventure"
        },
        {
          id: 16,
          name: "Animation"
        },
        {
          id: 35,
          name: "Comedy"
        },
        {
          id: 80,
          name: "Crime"
        },
        {
          id: 99,
          name: "Documentary"
        },
        {
          id: 18,
          name: "Drama"
        },
        {
          id: 10751,
          name: "Family"
        },
        {
          id: 14,
          name: "Fantasy"
        },
        {
          id: 36,
          name: "History"
        },
        {
          id: 27,
          name: "Horror"
        },
        {
          id: 10402,
          name: "Music"
        },
        {
          id: 9648,
          name: "Mystery"
        },
        {
          id: 10749,
          name: "Romance"
        },
        {
          id: 878,
          name: "Science Fiction"
        },
        {
          id: 10770,
          name: "TV Movie"
        },
        {
          id: 53,
          name: "Thriller"
        },
        {
          id: 10752,
          name: "War"
        },
        {
          id: 37,
          name: "Western"
        }
      ],
      genreID: null
    };
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(event){
    console.log('detected change @ search.jsx component :', JSON.stringify(event.target.value), typeof event.target.value)
    this.setState({genreID: event.target.value})
  }

  render() {
    let genres = this.state.genres;
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.onFormChange}>
          {genres.map((genre) => {
            return (
              <option value={genre.id}>{genre.name}</option>
            );
          })}
        </select>
        <br />
        <br />

        <button onClick={(e) => this.props.getMovies(this.state.genreID)}>Search</button>
      </div>
    );
  }
}

export default Search;
