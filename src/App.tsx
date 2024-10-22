import './styles/main.scss';
import PageMain from './components/pages/PageMain/PageMain';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PagePoll from './components/pages/PagePoll/PagePoll';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/poll" element={<PagePoll />} />
        <Route path="/" element={<PageMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
