import { Global, css } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import IssueDetail from './pages/IssueDetail';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <Router>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/issue/:id" element={<IssueDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

const globalStyle = css`
  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 1000px;
    margin: 0 auto;
  }
`;

export default App;
