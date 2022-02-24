import type { FC } from "react";

import "./App.css";

import { ContractsProvider } from "./lib/ContractsContext";
import { MintProvider } from "./lib/MintContext";
import { TicketProvider } from "./lib/TicketContext";
import IndexView from "./views/IndexView";

import "./App.css";

const App: FC = () => {
  return (
    <div>
      <ContractsProvider>
        <MintProvider>
          <TicketProvider>
            <IndexView />
          </TicketProvider>
        </MintProvider>
      </ContractsProvider>
    </div>
  );
};

export default App;
