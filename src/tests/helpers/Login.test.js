import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Teste a página login', () => {
    test('Testando se tiver inputs de nome e e-mail', () => {
        renderWithRouterAndRedux(<App />);
        const nome = screen.getByPlaceholderText('Digite seu nome');
        const email = screen.getByPlaceholderText('Digite um email');
        const bttn = screen.getByRole('button', { nome: /play/i });
        expect(nome && email && bttn).toBeInTheDocument()
    })
})