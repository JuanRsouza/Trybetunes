import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import '../index.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      resuultAPI: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }

  fetchAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({ resuultAPI: result, isLoading: false });
    const returnLocalStorage = await getFavoriteSongs();
    const mapReturn = result.map((music) => {
      if (returnLocalStorage.some((song) => song.trackId === music.trackId)) {
        return { ...music, checkbox: true };
      }
      return music;
    });
    this.setState({ resuultAPI: mapReturn });
  };

  handleChange = async (event) => {
    this.setState({ isLoading: true });
    const { resuultAPI } = this.state;
    const evento = Number(event.target.id);
    const test = resuultAPI.find((music) => music.trackId === evento);
    const mapAPI = resuultAPI.map((song) => {
      if (song.trackId === evento) {
        return { ...song, checkbox: !test.checkbox };
      }
      return song;
    });
    if (test.checkbox) {
      await removeSong(test);
    } else {
      await addSong(test);
    }
    this.setState({ isLoading: false, resuultAPI: mapAPI });
  };

  render() {
    const { resuultAPI, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Carregando />
          : (
            <div>
              <h3 data-testid="artist-name">
                {resuultAPI[0].artistName}
              </h3>
              <h3 data-testid="album-name">
                {resuultAPI[0].collectionName}
              </h3>
              {resuultAPI.slice(1).map((music) => (<MusicCard
                key={ music.trackId }
                music={ music }
                handleChange={ this.handleChange }
              />))}
            </div>
          )}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default Album;
