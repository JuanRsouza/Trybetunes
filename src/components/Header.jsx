import React, { Component } from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

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
      </header>
    );
  }
}
export default Header;
