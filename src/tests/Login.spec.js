import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux  from '../tests/helpers/renderWith';

import Login from '../pages/Login';
import App from '../App';

describe('Testing Login page', () => {
  test('should enable play button when both name and email are filled', () => {
    renderWithRouterAndRedux(<Login />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Name');
    userEvent.type(emailInput, 'name@example.com');
    expect(playButton).toBeEnabled();
  });

  test('should toggle settings being shown when settings button is clicked', () => {
    renderWithRouterAndRedux(<Login />);
    const settingsButton = screen.getByTestId('btn-settings');
    userEvent.click(settingsButton);
    const settingsTitle = screen.queryByTestId('settings-title');
    expect(settingsTitle).toBeInTheDocument();
    userEvent.click(settingsButton);
    expect(settingsTitle).not.toBeInTheDocument();
  });
  test('should when play button is clicked', async () => {

    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputName, "Nome");
    userEvent.type(inputEmail, "teste@teste.com");
    expect(buttonPlay).toBeEnabled();
    userEvent.click(buttonPlay);
    await waitFor(() => screen
      .findByRole('img', {  name: /profile/i}), {timeout: 5000})
  });
});