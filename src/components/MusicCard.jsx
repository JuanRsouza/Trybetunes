import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import Carregando from '../pages/Carregando';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const { music, handleChange } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        {
          isLoading
            ? <Carregando />
            : (
              <section>
                <ul>
                  <li className="li-music">
                    {music.trackName}
                    <audio
                      data-testid="audio-component"
                      src={ music.previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <label htmlFor={ music.trackId }>
                      Favorita
                      <input
                        type="checkbox"
                        onChange={ handleChange }
                        checked={ music?.checkbox || false }
                        id={ music.trackId }
                        data-testid={ `checkbox-music-${music.trackId}` }
                      />
                    </label>
                  </li>
                </ul>
              </section>
            )
        }

      </div>
    );
  }
}
MusicCard.propTypes = {
  resuultAPI: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
export default MusicCard;
