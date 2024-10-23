import './styles/main.scss';
import PageMain from './components/pages/PageMain/PageMain';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PagePoll from './components/pages/PagePoll/PagePoll';
import PageTemplate from './components/pages/templates/PageTemplate/PageTemplate';
import PagePollSingle from './components/pages/PagePollSingle/PagePollSingle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-poll" element={<PagePoll />} />
        <Route path="/poll/:id" element={<PagePollSingle />} />
        <Route path="/" element={<PageMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
