import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactGA from 'react-ga'; // Import react-ga
import Home from './components/pages/js/home';
import Login from './components/auth/login';
import ApplicationLanding from './components/pages/js/applicationLanding';
import FormPage from './components/pages/js/form';
import PresentationCheck from './components/pages/js/presentationcheck'
import ReviewResponses from './components/pages/js/ReviewResponses';
import History from './components/pages/js/presentationhistory'
import PresentationShare from './components/pages/js/presentationshare';
import Shortform from './components/pages/shortform/Form';
import Native_Form from './components/pages/Native-Form/Form';
import { TrackProvider } from './components/pages/Native-Form/Track';
import { CompetitionProvider } from './components/pages/Native-Form/Competition';
import { TeamProvider } from './components/pages/Native-Form/Team';
import { FinancialDataProvider } from './components/pages/Native-Form/financials'; 

function App() {
  useEffect(() => {
    ReactGA.initialize('G-7EK1LG8K6D'); // Initialize Google Analytics with your tracking ID
    ReactGA.pageview(window.location.pathname + window.location.search); // Record initial pageview
  }, []);

  return (
    <Router>
       <TrackProvider> 
       <CompetitionProvider >
        < TeamProvider>
        <FinancialDataProvider>
      <Routes>
      <Route path="/share" element={<PresentationShare />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/applicationLanding" element={<ApplicationLanding />} />
        <Route path="/Pages/presentationcheck" element={<PresentationCheck />} />
        <Route path="/Pages/ReviewResponses" element={<ReviewResponses />} />
        <Route path="/pages/presentationhistory" element={<History />} />
        <Route path="/pages/Nativeform" element={<Native_Form />} />
        <Route path="/pages/shortform" element={<Shortform />} />
        {/* <Route path="/Blog" element={<Blog/>} /> */}
      </Routes>
      </FinancialDataProvider>
      </TeamProvider>
      </CompetitionProvider>
      </TrackProvider>
    </Router>
  );
}

export default App;
