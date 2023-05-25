import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTokenFromApi } from '../services/index';
import { cleanScoreAction, getUserAction } from '../redux/actions/index';

class Login extends Component {
  state = {
    loginName: '',
    loginEmail: '',
    isDisabled: true,
    isLoading: false,
    isSettingsBeingShown: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.loginValidations);
  };

  handlePlayButton = async () => {
    const { loginName, loginEmail } = this.state;
    const { dispatch, history } = this.props;
    this.setState({
      isLoading: true,
    });
    const data = await getTokenFromApi();
    localStorage.setItem('token', data.token);
    this.setState({
      isLoading: false,
    }, () => {
      dispatch(getUserAction({ name: loginName, email: loginEmail }));
      history.push('/game');
    });
  };

  handleSettingsBeingShown = () => {
    const { isSettingsBeingShown } = this.state;
    if (!isSettingsBeingShown) {
      this.setState({ isSettingsBeingShown: true });
    } else {
      this.setState({ isSettingsBeingShown: false });
    }
  };

  loginValidations = () => {
    const { loginName, loginEmail } = this.state;
    if (loginName !== '' && loginEmail !== '') {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { loginName,
      loginEmail,
      isDisabled,
      isSettingsBeingShown, isLoading } = this.state;
    console.log(isLoading);
    const { dispatch } = this.props;
    return (
      <div>
        <label>
          Nome:
          <input
            data-testid="input-player-name"
            onChange={ this.handleChange }
            type="text"
            name="loginName"
            value={ loginName }
          />
        </label>
        <label>
          E-mail:
          <input
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            type="email"
            name="loginEmail"
            value={ loginEmail }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ () => {
            this.handlePlayButton();
            dispatch(cleanScoreAction());
          } }
          type="button"
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettingsBeingShown }
        >
          Settings
        </button>
        {isSettingsBeingShown && (
          <div>
            <h1 data-testid="settings-title">Settings</h1>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
