import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      isInputValid: false,
      isLoading: false,
      resultAPI: [],
      newInputName: '',
    };
  }

  async componentDidMount() {
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

  functionOnClick = async () => {
    const { inputName } = this.state;
    this.setState({ newInputName: inputName, inputName: '', isLoading: true });
    const result = await searchAlbumsAPI(inputName);
    this.setState({ isLoading: false, resultAPI: result });
  };

  render() {
    const { carregando } = this.props;
    const { inputName,
      isInputValid,
      isLoading,
      resultAPI,
      newInputName,
    } = this.state;

    if (carregando) return <Carregando />;

    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? <Carregando /> : (
          <form onSubmit={ this.functionOnClick }>
            <div>
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
                type="submit"
                data-testid="search-artist-button"
                disabled={ !isInputValid }
              >
                Pesquisar
              </button>
            </div>
          </form>
        )}
        <p>
          Resultado de álbuns de:
          {' '}
          {newInputName}
        </p>
        {resultAPI.length === 0
          ? <h3>Nenhum álbum foi encontrado</h3>
          : (
            <ul>
              { resultAPI.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <p>{album.collectionName}</p>
                    {' '}
                  </Link>

                </li>
              ))}
            </ul>
          )}

      </div>
    );
  }
}
Search.propTypes = {
  carregando: PropTypes.bool.isRequired,
  handleCarregando: PropTypes.func.isRequired,
};

export default Search;
