import React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Stars, OrthographicCamera } from "@react-three/drei";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import { ControlsBox } from "./utils/ControlsBox";
import { CameraControls } from "./utils/CameraControls";
import Demon from "./components/Demon";
import "./App.css";

function Box({ x, y, z}) {
  const [color, setColor] = useState("red");
  const [ref, api] = useBox(() => ({ mass: 1000, position: [x, 0, z] }));
  return (
    <mesh
      rotation={[Math.PI / 2, 0, 0]}
      onClick={() => {
        // api.velocity.set(0, 10, 0);

        setColor("green");
        e.stopPropagation();
      }}
      ref={ref}
      position={[x, y, z]}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
      <meshLambertMaterial
        attach="material"
        color={color}
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

function Plane({ setBox, activate }) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={(e) => {
        activate ?
          setBox({
            x: e.point.x,
            y: e.point.y,
            z: e.point.z,
          })
          : "";
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
  const [activate, setActivate] = useState(false)
  useEffect(() => {
    setBoxes([...boxes, box]);
  }, [box]);
  return (
    <>
      <h1> Welcome to Tadeo's World</h1>
      <Canvas
        camera={{ position: [50, 100, 250] }}
        onPointerUp={(e) => {
          e.stopPropagation();
          // setBox({
          // x: e.x,
          // y: e.y,
          // })
          console.log(e.nativeEvent);
        }}
      >
        <CameraControls />

        <Physics>
          {boxes.map((box, i) => {
            return <Box key={i} x={box.x} y={box.y} z={box.z} />;
          })}
          <Plane setBox={setBox} activate={activate} />
          <Sphere x={30} y={100} z={1} />
          <Demon position={[10, 0, 10]} />
        </Physics>

        <ambientLight intensity={0.8} />
        <spotLight position={[0, 150, 111]} angle={Math.PI / 3} />
        <Stars radius={200} />
      </Canvas>
      <ControlsBox boxes={boxes} setBoxes={setBoxes} box={box} setBox={setBox} activate={activate} setActivate={setActivate} />
    </>
  );
}

export default App;
