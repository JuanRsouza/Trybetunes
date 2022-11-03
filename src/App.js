import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      carregando: false,
    };
  }

  buttonClickChange = (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ carregando: true }, async () => {
      const { history } = this.props;
      await createUser({ name: userName });
      history.push('/search');
    });
  };

  handleCarregando = () => {
    this.setState({ carregando: false });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateInputUserName = () => {
    const { userName } = this.state;
    const numberValidate = 3;
    const nameLength = userName.length >= numberValidate;
    return nameLength;
  };

  render() {
    const { userName, carregando } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Login
              userName={ userName }
              handleChange={ this.handleChange }
              isInputValid={ this.validateInputUserName() }
              buttonClickChange={ this.buttonClickChange }
              carregando={ carregando }
            />
          ) }
        />
        <Route
          exact
          path="/search"
          render={ () => (
            <Search
              carregando={ carregando }
              handleCarregando={ this.handleCarregando }
            />
          ) }
        />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="" component={ NotFound } />
      </Switch>
    );
  }
}
App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(App);
