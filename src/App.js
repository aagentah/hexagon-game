import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import * as _ from "lodash";

import Hex from "./components/hex";
import Object from "./components/object";
import Stats from "./components/stats";

import { honeycombState } from "./state/honeycomb";
import { gridState } from "./state/grid";
import { gameState } from "./state/game";

import { spawnPlayer } from "./lib/spawnPlayer";
import { handleHexStates } from "./lib/handleHexStates";

import logo from "./logo.svg";
import "./App.scss";

function App() {
  const [honeycomb, setHoneycomb] = useRecoilState(honeycombState);
  const [grid, setGrid] = useRecoilState(gridState);
  const [game, setGame] = useRecoilState(gameState);
  const [hasRendered, setHasRendered] = useState(false);
  const [hasInitRound, setHasInitRound] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    if (!grid.length) return;

    // Spawn player
    if (game.round === 0) {
      await spawnPlayer({ grid, game });
    }

    await handleHexStates();

    setHasInitRound(true);
  }, [hasRendered, game.round]);

  useEffect(() => {
    if (grid.length) setHasRendered(true);
  }, [grid]);

  setTimeout(() => {
    setReady(true);
  }, 500);

  if (ready) {
    return (
      <main className="App">
        <div className="hexGridWrapper">
          <div className="hexCrop">
            <div className="hexGrid">
              {honeycomb.grid.length &&
                honeycomb.grid.map((coords, i) => {
                  return (
                    <Hex key={i} game={game} x={coords.x} y={coords.y} i={i} />
                  );
                })}
            </div>
          </div>

          {hasInitRound && (
            <div className="hexObjects">
              {grid.map((hex, i) => {
                return <Object key={i} game={game} hex={hex} />;
              })}
            </div>
          )}
        </div>

        {hasInitRound && (
          <div className="state">
            <Stats game={game} />
          </div>
        )}
      </main>
    );
  }

  return false;
}

export default App;
