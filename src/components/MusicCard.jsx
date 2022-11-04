import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { resuultAPI } = this.props;
    return (
      <div>
        <ul>
          {resuultAPI.slice(1).map((el) => (
            <li key={ el.trackId }>
              {el.trackName}
              <audio data-testid="audio-component" src="{previewUrl}" controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </li>

          ))}
        </ul>
      </div>
    );
  }
}
MusicCard.propTypes = {
  resuultAPI: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
export default MusicCard;
