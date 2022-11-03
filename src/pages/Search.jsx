import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../components/Header';

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
        <Header />
      </div>
    );
  }
}
Search.propTypes = {
  carregando: PropTypes.bool.isRequired,
  handleCarregando: PropTypes.func.isRequired,
};

export default Search;
