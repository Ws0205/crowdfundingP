// React tools
import React from "react";
import { createRoot } from "react-dom/client";

// React Router dom
import { BrowserRouter as Router } from "react-router-dom";

// custom app
import App from "./App";

// thirdweb tools
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// providers
import { StateCampaignContextProvider } from "./contexts";
import { Toaster } from 'react-hot-toast';

// styles
import "./styles/index.css";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={ChainId.Goerli} activeChain="goerli">
      <Toaster />
      <Router>
        <StateCampaignContextProvider>

          <App />
        </StateCampaignContextProvider>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
