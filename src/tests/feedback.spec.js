import Feedback from "../pages/Feedback";
import { screen } from '@testing-library/react';

import renderWithRouterAndRedux from "./helpers/renderWith";
import userEvent from "@testing-library/user-event";

test('testa se os elementos HTML estão presentes na tela', () => {
  renderWithRouterAndRedux(<Feedback history={window.history} />);

  expect(screen.getByRole('img', {  name: /profile/i})).toBeInTheDocument();
  expect(screen.getByTestId('header-player-name')).toBeInTheDocument();
  expect(screen.getByText(/could be better\.\.\./i)).toBeInTheDocument();
  expect(screen.getByTestId('feedback-total-score')).toBeInTheDocument();

});

test('Ao clicar no botão Ranking redireciona para a página de Ranking', () => {
  renderWithRouterAndRedux(<Feedback history={window.history} />);
  window.history.push = jest.fn();
const button = screen.getByRole('button', {  name: /ranking/i});
userEvent.click(button)

  expect(window.history.push).toBeCalledWith('/ranking')
});

test('Ao clicar no botão Play Again redireciona para a página de Login', () => {
  renderWithRouterAndRedux(<Feedback history={window.history} />);
  window.history.push = jest.fn();
const button = screen.getByRole('button', {  name: /Play Again/i});
userEvent.click(button)

  expect(window.history.push).toBeCalledWith('/')
});
