import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import '../index.css';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    const { match: { params } } = this.props;
    const { id } = params;
    const result = await getMusics(id);
    this.setState({ resuultAPI: result, isLoading: false });
    const returnLocalStorage = await getFavoriteSongs();
    console.log(returnLocalStorage);
  };

  handleChange = async (event) => {
    const { resuultAPI } = this.state;
    const evento = Number(event.target.id);
    const test = resuultAPI.find((music) => music.trackId === evento);
    const filtrar = resuultAPI.map((el) => {
      if (el.trackId === evento) {
        return { ...el, checkbox: true };
      }
      return el;
    });
    console.log(filtrar);
    this.setState({ isLoading: true, resuultAPI: filtrar });
    await addSong(test);
    this.setState({ isLoading: false });
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
            </div>
          )}
        {resuultAPI.slice(1).map((music) => (<MusicCard
          key={ music.trackId }
          music={ music }
          handleChange={ this.handleChange }
        />))}
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
