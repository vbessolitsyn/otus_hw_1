import { render } from '@testing-library/react';

import App from '../app';

test('renders app component', () => {
  const { container, getByRole } = render(<App />);

  expect(getByRole('main')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

test('catch evaluate result', () => {
  const { container } = render(<App />);
  container.getElementsByClassName('input')[0].innerHTML = '123 + 321';
  container.getElementsByClassName('result')[0].innerHTML = 'Результат: 444';
});

test('catch evaluate exceptions', () => {
  const { container } = render(<App />);
  container.getElementsByClassName('input')[0].innerHTML = 'error content';
  container.getElementsByClassName('result')[0].innerHTML =
    'Результат: Expression error content is not valid';
});
