import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import * as _ from "lodash";

import Hex from "./components/hex";
import Object from "./components/object";
import Stats from "./components/stats";

import { honeycombState } from "./state/honeycomb";
import { gridState } from "./state/grid";
import { gameState } from "./state/game";
import { captionState } from "./state/caption";

import { playerSpawn } from "./lib/playerSpawn";
import { handleHexStates } from "./lib/handleHexStates";

import logo from "./logo.svg";
import "./App.scss";

function App() {
  const [honeycomb, setHoneycomb] = useRecoilState(honeycombState);
  const [grid, setGrid] = useRecoilState(gridState);
  const [game, setGame] = useRecoilState(gameState);
  const [caption, setCaption] = useRecoilState(captionState);
  const [hasRendered, setHasRendered] = useState(false);
  const [hasInitRound, setHasInitRound] = useState(false);
  const [ready, setReady] = useState(false);

  const images = [
    "/images/dirt.png",
    "/images/grass-1.png",
    "/images/peak-1.png",
    "/images/peak-2.png",
    "/images/trees-1.png",
    "/images/small-building-1.png",
    "/images/bonfire.png",
    "/images/wizzard/idle.png",
    "/images/wizzard/walk-N.png",
    "/images/wizzard/walk-NE.png",
    "/images/wizzard/walk-NW.png",
    "/images/wizzard/walk-S.png",
    "/images/wizzard/walk-SE.png",
    "/images/wizzard/walk-SW.png",
  ];

  useEffect(async () => {
    if (!grid.length) return;

    // Spawn player
    if (game.round === 0) {
      await playerSpawn({ grid, game });
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
                return (
                  <Object key={i} game={game} hex={hex} caption={caption} />
                );
              })}
            </div>
          )}
        </div>

        {hasInitRound && (
          <div className="state">
            <Stats game={game} />
          </div>
        )}

        {images.map((image, i) => {
          return <img className="preload" key={i} src={image} />;
        })}
      </main>
    );
  }

  return false;
}

export default App;
