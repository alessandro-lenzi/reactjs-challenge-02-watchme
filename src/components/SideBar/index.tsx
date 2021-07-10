import { useEffect, useState } from "react";
import { api } from '../../services/api';

import { GenreResponseProps } from "../../@types/custom";
import { Button } from "../Button";

import '../../styles/sidebar.scss';


export type SideBarProps = {
  onGenreSelected: (genre:GenreResponseProps) => void,
};

export function SideBar({ onGenreSelected }: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(0);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
      setSelectedGenreId(response.data[0].id);
    });
  }, []);

  useEffect(() => {
    const genre = genres.find(genre => genre.id === selectedGenreId);
    if (genre)
      onGenreSelected(genre);
  }, [selectedGenreId]);

  function handleGenreClick(genreId: number) {
    setSelectedGenreId(genreId);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleGenreClick(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>

  );

}