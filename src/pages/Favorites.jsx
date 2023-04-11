import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends Component {
  state = {
    resultAPI: [],
    ischecked: true,
    isLoading: false,
  };

  componentDidMount() {
    this.funcTest();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  funcTest = async () => {
    this.setState({ isLoading: true });
    const returnLocalStorage = await getFavoriteSongs();
    this.setState({ resultAPI: returnLocalStorage, ischecked: true, isLoading: false });
  };

  render() {
    const { resultAPI, ischecked, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading
            ? <Carregando />
            : (
              <div>
                <ul>
                  {resultAPI.map((music) => (<MusicCard
                    key={ music.trackId }
                    music={ music }
                    checked={ ischecked }
                    handleChange={ this.handleChange }
                  />))}
                </ul>
              </div>
            )
        }

      </div>
    );
  }
}

export default Favorites;
