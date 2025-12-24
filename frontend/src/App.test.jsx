import {test, expect} from 'vitest';
import {render} from '@testing-library/react';
import App from './App.jsx';

test('renders App component', ()=>{
    const {getByText} = render(<App/>);
    expect(getByText(/contact manager/i)).toBeDefined();
});
