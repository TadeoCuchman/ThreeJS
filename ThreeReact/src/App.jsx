import React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import {
  Canvas,
  useLoader,
  extend,
} from "@react-three/fiber";
import {  Stars } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  Physics,
  useBox,
  usePlane,
  useSphere,
} from "@react-three/cannon";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import { Controls } from './utils/Controls'
import { CameraControls } from './utils/CameraControls'
import Demon from './components/Demon';
import "./App.css";
extend({ OrbitControls });



function Box({ x, y, z }) {
  const [ref, api] = useBox(() => ({ mass: 1, position: [x, y, z] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 10, 0);
      }}
      ref={ref}
      position={[x, y, z]}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
      <meshLambertMaterial
        attach="material"
        color="red"
      ></meshLambertMaterial>
    </mesh>
  );
}

function Sphere({ x, y, z }) {
  const colorMap = useLoader(TextureLoader, "/moon.jpg");

  const [ref, api] = useSphere(() => ({ position: [x, y, z] }));
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[x, y, z]}>
      <sphereGeometry attach="geometry" args={[15, 50, 50]}></sphereGeometry>
      <meshLambertMaterial
        attach="material"
        color="white"
        map={colorMap}
        transparent
      ></meshLambertMaterial>
    </mesh>
  );
}

function Plane({setBox, setBoxes, box, boxes }) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={(e) => {
        setBox({ x: e.point.x, y: e.point.y, z: e.point.z });
        setBoxes([...boxes, box]);

      }}
      onUpdate={(self) => console.log("props have been updated")}
    >
      <circleBufferGeometry
        attach="geometry"
        args={[150, 100]}
      ></circleBufferGeometry>
      <meshLambertMaterial
        attach="material"
        color="darkblue"
      ></meshLambertMaterial>
    </mesh>
  );
}




function App() {
  const [boxes, setBoxes] = useState([]);
  const [box, setBox] = useState({ x: undefined, y: undefined, z: undefined });
  return (
    <>
      <h1> Welcome to Tadeo's World</h1>
      <Canvas camera={{ position: [50, 100, 250] }}>
        <CameraControls />

        <Physics>
          {boxes.map((box, i) => {
            return <Box key={i} x={box.x} y={box.y} z={box.z} />;
          })}
          <Plane setBox={setBox} setBoxes={setBoxes} box={box} boxes={boxes}/>
          <Sphere x={30} y={100} z={1} />
          <Demon position={[10, 0, 10]} />
        </Physics>

        <ambientLight intensity={0.8} />
        <spotLight position={[0, 150, 111]} angle={Math.PI / 3} />
        <Stars radius={200} />
      </Canvas>
     <Controls boxes={boxes} setBoxes={setBoxes} box={box} setBox={setBox}/>
    </>
  );
}

export default App;
