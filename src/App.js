import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import * as Honeycomb from "honeycomb-grid";
import { honeycombState } from "./state/honeycomb";

import logo from "./logo.svg";
import "./App.scss";

import Hex from "./components/hex";

function App() {
  const [honeycomb, setHoneycomb] = useRecoilState(honeycombState);

  console.log("honeycomb", honeycomb);
  // console.log("neighborsOf", honeycomb.grid.neighborsOf(honeycomb.hex(3, 4)));
  // console.log("co", honeycomb.hex(2).coordinates());

  const gridArr = () => {
    const arr = [];
    for (let i = 0; i < honeycomb.grid.length; i++) {
      arr.push(honeycomb.grid[i]);
    }

    return arr;
  };

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
              {gridArr().map((coords, i) => {
                return <Hex key={i} x={coords.x} y={coords.y} i={i} />;
              })}
            </div>
          </div>
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
