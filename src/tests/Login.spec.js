import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';
import { act } from 'react-dom/test-utils';
describe('Testing Login page', () => {
    test('should render Login page', () => {
        renderWithRouterAndRedux(<Login />);
        expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
        expect(screen.getByTestId('btn-play')).toBeInTheDocument();
        expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
      });
      test('should enable play button when both name and email are filled', () => {
        renderWithRouterAndRedux(<Login />);
        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByTestId('btn-play');
        userEvent.type(nameInput, 'John');
        userEvent.type(emailInput, 'john@example.com');
        expect(playButton).toBeEnabled();
      });
      test('should disable play button when either name or email is empty', () => {
        renderWithRouterAndRedux(<Login />);
        const nameInput = screen.getByTestId('input-player-name');
        const emailInput = screen.getByTestId('input-gravatar-email');
        const playButton = screen.getByTestId('btn-play');
        userEvent.type(nameInput, 'John');
        userEvent.clear(emailInput);
        expect(playButton).toBeDisabled();
        userEvent.clear(nameInput);
        userEvent.type(emailInput, 'john@example.com');
        expect(playButton).toBeDisabled();
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
        await waitFor(() => {
          const { pathname } = history.location;
          expect(pathname).toBe('/');
        }, 3000);
      });
      test('should render App component for the "/" route', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        userEvent.click(screen.getByTestId('btn-settings'));
        const { pathname } = history.location;
        expect(pathname).toBe('/');
      });
});