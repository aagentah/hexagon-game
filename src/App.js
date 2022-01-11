import React, { useRef, useState, useEffect } from "react";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import * as Honeycomb from "honeycomb-grid";
import { honeycombState } from "./state/honeycomb";
import { gridState } from "./state/grid";
import * as _ from "lodash";

import logo from "./logo.svg";
import "./App.scss";

import Hex from "./components/hex";
import Objects from "./components/objects";

function App() {
  const [hasRendered, setHasRendered] = useState(false);
  const [honeycomb, setHoneycomb] = useRecoilState(honeycombState);
  const [grid, setGrid] = useRecoilState(gridState);

  useEffect(() => {
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

    setHasRendered(true);
  }, [hasRendered]);

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
