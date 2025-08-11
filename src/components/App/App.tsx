
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid"; // предположим, что компонент уже есть
import { fetchMovies } from "../../services/movieService";
import { type Movie } from "../../types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchBar = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchMovies(query);
      setMovies(data.results);
    } catch  {
      setError("There was an error, please try again...");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchBar} />

      {loading && <p>Loading movies, please wait...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>No movies found for your query.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={(movie) => console.log(movie)} />
      )}
    </div>
  );
}

export default App;
