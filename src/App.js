import React, { useRef, useState, useEffect } from "react";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import * as Honeycomb from "honeycomb-grid";

import * as _ from "lodash";

import Hex from "./components/hex";
import Objects from "./components/objects";

import { honeycombState } from "./state/honeycomb";
import { gridState } from "./state/grid";
import { gameState } from "./state/game";

import { spawnPlayer } from "./lib/spawnPlayer";

import logo from "./logo.svg";
import "./App.scss";

function App() {
  const [honeycomb, setHoneycomb] = useRecoilState(honeycombState);
  const [grid, setGrid] = useRecoilState(gridState);
  const [game, setGame] = useRecoilState(gameState);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (!grid.length) return;

    // Spawn player
    if (game.round === 0) {
      spawnPlayer({ grid, game });
    }
    // const gridArr = () => {
    //   const arr = [];
    //   for (let i = 0; i < honeycomb.grid.length; i++) {
    //     arr.push(honeycomb.grid[i]);
    //   }
    //
    //   return arr;
    // };
    //
    // const newGame = _.cloneDeep(game);
    // newGame.grid = gridArr();
    // setGame(newGame);

    //
  }, [hasRendered, game.round]);

  useEffect(() => {
    if (grid.length) setHasRendered(true);
  }, [grid]);

  // useEffect(() => {
  //   console.log("game", game);
  // }, [game]);

  return (
    <div className="App">
      {
        // <header className="App-header">
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <p>
        //     Edit <code>src/App.js</code> and save to reload.
        //   </p>
        //   <a
        //     className="App-link"
        //     href="https://reactjs.org"
        //     target="_blank"
        //     rel="noopener noreferrer"
        //   >
        //     Learn React
        //   </a>
        // </header>
      }

      <main>
        <div id="hexGrid">
          <div className="hexCrop">
            <div className="hexGrid">
              {honeycomb.grid.length &&
                honeycomb.grid.map((coords, i) => {
                  return <Hex key={i} x={coords.x} y={coords.y} i={i} />;
                })}
            </div>
          </div>

          {grid.length && (
            <div id="hexGridObjects">
              {grid.length &&
                grid.map((hex, i) => {
                  return <Objects key={i} hex={hex} />;
                })}
            </div>
          )}
        </div>
      </main>

      {
        // <footer>
        //   <p>
        //     Thanks to{" "}
        //     <a href="https://css-tricks.com/snippets/css/complete-guide-grid/">
        //       CSS-Tricks
        //     </a>
        //     , <a href="http://csshexagon.com/">CSS Hexagon, Please</a> and{" "}
        //     <a href="https://simpleicons.org/">Simple Icons</a>.
        //   </p>
        // </footer>
      }
    </div>
  );
}

export default App;
