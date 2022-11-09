import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  componentDidMount() {
    this.funcTest();
  }

  funcTest = async () => {
    const returnLocalStorage = await getFavoriteSongs();
    return returnLocalStorage;
  };

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}

export default Favorites;
