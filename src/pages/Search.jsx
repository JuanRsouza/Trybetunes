import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      isInputValid: false,
    };
  }

  componentDidMount() {
    const { handleCarregando } = this.props;
    handleCarregando();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInputUserName);
  };

  validateInputUserName = () => {
    const { inputName } = this.state;
    const numberValidate = 2;
    const nameLength = inputName.length >= numberValidate;
    this.setState({ isInputValid: nameLength });
  };

  render() {
    const { carregando } = this.props;
    const { inputName, isInputValid } = this.state;

    if (carregando) return <Carregando />;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="nome-banda">
            <input
              type="text"
              name="inputName"
              value={ inputName }
              onChange={ this.handleChange }
              id="nome-banda"
              data-testid="search-artist-input"
              placeholder="Nome do artista ou banda "
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !isInputValid }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
Search.propTypes = {
  carregando: PropTypes.bool.isRequired,
  handleCarregando: PropTypes.func.isRequired,
};

export default Search;
