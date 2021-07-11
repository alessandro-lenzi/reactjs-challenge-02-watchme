import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { GenreResponseProps } from './@types/custom';


export function App(): JSX.Element {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  function handleGenreSelected(genre: GenreResponseProps) {
    setSelectedGenre(genre);
  }

  return (
    <div className="app-container">
      <SideBar
        onGenreSelected={genre => handleGenreSelected(genre)}
      />

      <Content
        selectedGenre={selectedGenre}
      />
    </div>
  )
}
