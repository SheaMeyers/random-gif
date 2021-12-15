import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('initial gif rendered when app loads', async () => {
  render(<App />);
  await waitFor(async () => {
    const gifElement: any = screen.getByTitle('random-gif')
    expect(gifElement.src).toBe('https://giphy.com/embed/09Wz9EoEGPd3E44GEg');
  })
});

  
test('searching makes API call with two characters', async () => {
  render(<App />);
  const searchBar = screen.getByRole('textbox', { name: 'Search' });
  userEvent.type(searchBar, 'ab');

  await waitFor(async () => {
    const gifImage = await screen.findByAltText('Antonio Brown Smile GIF by Uninterrupted')
    expect(gifImage).toBeInTheDocument()
  })
});

test('clicking image opens modal', async () => {
  render(<App />);
  const searchBar = screen.getByRole('textbox', { name: 'Search' });
  userEvent.type(searchBar, 'ab');

  await waitFor(async () => {
    const gifImage = await screen.findByAltText('Antonio Brown Smile GIF by Uninterrupted')
    expect(gifImage).toBeInTheDocument()
    userEvent.click(gifImage);
    const modal = await screen.findByLabelText('Display Gif Modal')
    expect(modal).toBeInTheDocument()
  })
});
