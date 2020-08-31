import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Login } from './login';

const App = () => <div>
  <Login />
</div>;
const root = document.getElementById('root');

ReactDOM.render(<App />, root);