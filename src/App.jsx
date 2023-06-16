import { Provider } from 'react-redux';
import store from './pages/store.js';
import SearchPage from './pages/SearchPage.jsx';
import SavedGifsPage from './pages/SavedGifsPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
    <Router>
  <Provider store={store}>
        <Routes>
          <Route  path="/" element= {<SearchPage policyTypes={false} />} />
          <Route  path="/saved-gifs"  element= {<SavedGifsPage policyTypes={false} />} />
        </Routes>
  </Provider>
    </Router>
);

export default App;
