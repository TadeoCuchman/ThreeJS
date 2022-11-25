import React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Stars,
  Float,
  Environment,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

import { ControlsBox } from "./utils/ControlsBox";
import { CameraControls } from "./utils/CameraControls";
import Demon from "./components/Demon";
import { Moon } from "./components/Moon";
import "./App.css";

function Box({ x, y, z }) {
  const [color, setColor] = useState("red");
  const [ref, api] = useBox(() => ({
    mass: 10,
    position: [x, y, z],
    args: [3, 3, 3],
  }));
  return (
    <mesh
      // rotation={[Math.PI / 2, 0, 0]}
      onClick={(e) => {
        api.velocity.set(0, 10, 0);
        setColor("green");
        e.stopPropagation();
      }}
      ref={ref}
      position={[x, y, z]}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]}></boxBufferGeometry>
      <meshLambertMaterial
        attach="material"
        color={color}
      ></meshLambertMaterial>
    </mesh>
  );
}

function Plane({ setBox, activate }) {
  const [ref] = usePlane(() => ({
    rotation: [0, 0, 0],
     position:[0, 10, -190]
  }));

  return (
    <mesh
      rotation={[0, 0, 0]}
      position={[0, 10, -190]}
      onClick={(e) => {
        activate
          ? setBox({
              x: e.point.x,
              y: -10,
              z: e.point.z,
            })
          : "";
      }}

      // onUpdate={(self) => console.log("props have been updated")}
    >
      <circleBufferGeometry
        attach="geometry"
        args={[200, 100]}
      ></circleBufferGeometry>
      <meshLambertMaterial
        attach="material"
        color="darkblue"
      ></meshLambertMaterial>
    </mesh>
  );
}

function Flor({ setBox, activate }) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <>
      <mesh
        ref={ref}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          activate
            ? setBox({
                x: e.point.x,
                y: e.point.y,
                z: e.point.z,
              })
            : "";
        }}
      >
        <planeGeometry args={[400, 400]} />
        <MeshReflectorMaterial
          blur={[400, 20]}
          resolution={2048}
          // mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#020028"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="city" />
    </>
  );
}

function App() {
  const [boxes, setBoxes] = useState([]);
  const [box, setBox] = useState({ x: undefined, y: undefined, z: undefined });
  const [activate, setActivate] = useState(false);
  const [physics, setPhysics] = useState(false);

  useEffect(() => {
    setBoxes([...boxes, box]);
  }, [box]);

  return (
    <>
      <h1> Welcome to Tadeo's World</h1>
      <Canvas camera={{ position: [0, 50, 200] }} shadows>
        <CameraControls />
        <Physics isPaused={physics}>
          <Moon x={30} y={100} z={1} />
          <Float floatIntensity={2.3} rotationIntesity={1.5} speed={1.4}>
            <Demon position={[0, 20, 0]} />
          </Float>
          {boxes.map((box, i) => {
            return <Box key={i} x={box.x} y={box.y} z={box.z} />;
          })}
          <Plane setBox={setBox} activate={activate} />
          <Flor setBox={setBox} activate={activate} />
        </Physics>
        <ambientLight intensity={0.5} />
        <Stars radius={200} />
      </Canvas>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ControlsBox
          boxes={boxes}
          setBoxes={setBoxes}
          box={box}
          setBox={setBox}
          activate={activate}
          setActivate={setActivate}
        />
        <div id="controlNewBoxes">
          <span>Pause Physics</span>
          <input
            type="checkbox"
            value={physics}
            onChange={() => setPhysics(!physics)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
