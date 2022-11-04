import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

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
    const resultAPI = await getMusics(id);
    console.log(resultAPI);
    this.setState({ resuultAPI: resultAPI, isLoading: false });
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
        <MusicCard resuultAPI={ resuultAPI } />
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
