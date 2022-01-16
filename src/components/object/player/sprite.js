import { useState, useEffect } from "react";

function Sprite({ image, size, count, speed }) {
  const [position, setPosition] = useState(0);
  const [iteration, setIteration] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (iteration === count) {
        setPosition(0);
        setIteration(1);
      } else {
        setPosition(position + size);
        setIteration(iteration + 1);
      }
    }, speed);
  }, [iteration]);

  return (
    <>
      <div
        className="object  object--player"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url(${image})`,
          backgroundPosition: `${-position}px 0px`,
        }}
      ></div>
    </>
  );
}

export default Sprite;
