import type { FC } from "react";

import "./App.css";

import { NFTProvider } from "./lib/NFTContext";
import { MintProvider } from "./lib/MintContext";
import { TestView } from "./TestView";
import IndexView from "./views/IndexView";

import "./App.css";

const App: FC = () => {
  return (
    <div>
      <NFTProvider>
        <MintProvider>
          <IndexView />
        </MintProvider>
      </NFTProvider>
    </div>
  );
};

export default App;
