import { useEffect, useState } from "react";
import { api } from '../../services/api';

import { GenreResponseProps, MovieProps } from "../../@types/custom";
import { MovieCard } from '../../components/MovieCard';

import '../../styles/content.scss';


export type ContentProps = {
  selectedGenre: GenreResponseProps;
};

export function Content({ selectedGenre }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

       <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}