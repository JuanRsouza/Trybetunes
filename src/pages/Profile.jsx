import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    resultAPI: {},
  };

  componentDidMount() {
    this.functionGetUser();
  }

  functionGetUser = async () => {
    const response = await getUser();
    console.log(response);
    this.setState({ resultAPI: response });
  };

  render() {
    const { resultAPI } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <img data-testid="profile-image" src={ resultAPI.image } alt={ resultAPI.name } />
        <h2>
          Nome
        </h2>
        <p>{resultAPI.name}</p>
        <h2>
          Email
        </h2>
        <p>{resultAPI.email}</p>
        <h2>
          Descrição
        </h2>
        <p>{resultAPI.description}</p>
        <Link to="/profile/edit">Editar perfil</Link>

      </div>
    );
  }
}

export default Profile;
