import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import * as _ from "lodash";

import { playerState } from "../../state/player";
import { increaseStats } from "../../lib/increaseStats";
import { totemSelecting } from "../../lib/totemSelecting";

function Stats({ game }) {
  const [player, setPlayer] = useRecoilState(playerState);
  const { stats } = player;

  const increaseBtn = (attr) => {
    const isDisabled = player.coins === 0;

    return (
      <div
        className={`increase-button  ${isDisabled ? "disabled" : ""}`}
        onClick={() => !isDisabled && increaseStats(attr)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
        </svg>
      </div>
    );
  };

  return (
    <>
      <div>Coins: {player.coins}</div>
      <br />
      <div>
        Attack: {stats.attack} {increaseBtn("attack")}
      </div>
      <div>
        Agility: {stats.agility} {increaseBtn("agility")}
      </div>
      <div>
        Conjuration: {stats.conjuration} {increaseBtn("conjuration")}
      </div>
      <br />
      <div
        onClick={() => {
          if (stats.conjuration > player.totems.length) {
            totemSelecting("1");
          }
        }}
      >
        Totem: 1
      </div>
      <br />
      {game.isSelectingTotem && <>(Place Totem on board!)</>}
      {
        // <div onClick={() => totemSelecting("2")}>Totem: 2</div>
        // <div onClick={() => totemSelecting("3")}>Totem: 3</div>
      }
    </>
  );
}

export default Stats;
