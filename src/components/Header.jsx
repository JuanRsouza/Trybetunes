import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import '../index.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      userName: {},
    };
  }

  componentDidMount() {
    this.validateGetUser();
  }

  validateGetUser = async () => {
    this.setState({ isLoading: true });
    const resultGetUser = await getUser();
    this.setState({ isLoading: false, userName: resultGetUser });
  };

  render() {
    const { isLoading, userName } = this.state;
    if (isLoading) return <Carregando />;
    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">
          {userName.name}
        </h4>
        <Link
          className="links"
          to="/search"
          data-testid="link-to-search"
        >
          Página de Pesquisa
        </Link>
        <Link
          className="links"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Músicas Favoritas
        </Link>
        <Link
          className="links"
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}
export default Header;
