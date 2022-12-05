import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Discover } from "./routes/discover";
import GlobalctxProvider from "./contexts/AppContext";
import "./App.css";
import Layout from "./components/layout";
//for commit
function App() {
  return (
    <GlobalctxProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Discover />} />
          </Routes>
        </Router>
      </Layout>
    </GlobalctxProvider>
  );
}

export default App;
