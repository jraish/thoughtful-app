import "./index.css";
import { render } from 'react-dom';

import App from "./App";


const Root = () => (
  <App />
)

render(<Root />, document.getElementById('root'));