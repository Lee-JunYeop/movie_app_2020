import React from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

/*
function Food({name, rating}) {
  return (
    <div>
      <h2>I Like {name}</h2>
      <h4>{rating}/5.0</h4>
    </div>
  );
}

const foodILike = [
  {
    id : 1,
    name : "Kimchi",
    rating : 5
  },
  {
    id : 2,
    name : "Ramen",
    rating : 4
  },
  {
    id : 3,
    name : "Kimbap",
    rating : 5
  },
  {
    id : 4,
    name : "Samgyuepsal",
    rating : 4.5
  }
];

function renderFood(dish) {
  console.log(dish);
  return <Food key={dish.id} name={dish.name} rating={dish.rating} />;
}

Food.propTypes = {
  name : PropTypes.string.isRequired,
  rating :  PropTypes.number.isRequired
};

function App() {
  return (
    <div className="App">
      {foodILike.map(renderFood)}
    </div>
  );
}*/

/*class App extends React.Component {
  state = {
    count : 0
  };

  add = () => {
    this.setState(current => ({count : current.count + 1}));
  };

  minus = () => {
    this.setState(current => ({count : current.count - 1}));
  };

  render() {
  return (
    <div>
      <h1>The number is {this.state.count}</h1>
      <button onClick={this.add}>Add</button>
      <button onClick={this.minus}>Minus</button>
    </div>
  )};
}*/

class App extends React.Component {
  state = {
    isLoading : true,
    movies : []
  };

  getMovies = async () => {
    const {
      data : {
        data : { movies }
      }
    } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    
    this.setState({ movies, isLoading : false });
  };

  componentDidMount() {
    /*setTimeout(() => {
      this.setState({isLoading : false});
    }, 6000);*/
    this.getMovies();
  };

  render() {
    const {isLoading, movies} = this.state
    return (
      <section className="container">
        {isLoading ? (<div className="loader">
                       <span className="loader__text">Loading...</span>
                     </div>) : (
                       <div className="movies">
                         {movies.map(movie => (
                          <Movie
                            key = {movie.id}
                            id = {movie.id}
                            year = {movie.year}
                            title = {movie.title}
                            summary = {movie.summary}
                            poster = {movie.medium_cover_image}
                            genres = {movie.genres}
                          />
                         ))}
                        </div>
      )}</section>
    );
  };
}

export default App;
