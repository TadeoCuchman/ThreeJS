import React from "react";

export const Controls = ({ box, boxes, setBox, setBoxes}) => {
  return (
    <div id="controlNewBoxes">
      <span>New Box:</span>
      <span>
        X ---->
        <input
          type="number"
          max="300"
          min="-300"
          value={box.x}
          onChange={(event) => {
            if (event.target.value > 100 || event.target.value < 0) {
              event.target.value = 0;
            }
            setBox({ ...box, x: parseInt(event.target.value) });
          }}
        />
      </span>
      <span>
        Y ---->
        <input
          type="number"
          max="300"
          min="-300"
          value={box.y}
          onChange={(event) => {
            if (event.target.value > 100 || event.target.value < 0) {
              event.target.value = 0;
            }
            setBox({ ...box, y: parseInt(event.target.value) });
          }}
        />
      </span>
      <span>
        Z ---->
        <input
          type="number"
          max="300"
          min="-300"
          value={box.z}
          onChange={(event) => {
            if (event.target.value > 100 || event.target.value < 0) {
              event.target.value = 0;
            }
            setBox({ ...box, z: parseInt(event.target.value) });
          }}
        />
      </span>
      <button
        onClick={() => {
          setBoxes([...boxes, box]);
        }}
      >
        addBox
      </button>
    </div>
  );
};
