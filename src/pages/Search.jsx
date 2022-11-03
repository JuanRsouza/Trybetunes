import React, { Component } from 'react';
import Carregando from './Carregando';

class Search extends Component {
  componentDidMount() {
    const { handleCarregando } = this.props;
    handleCarregando();
  }

  render() {
    const { carregando } = this.props;

    if (carregando) return <Carregando />;

    return (
      <div data-testid="page-search">
        Search
      </div>
    );
  }
}

export default Search;
