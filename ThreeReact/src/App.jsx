import React from "react";
import { useState, useEffect, useRef, Suspense } from "react";
import {
  Canvas,
  useLoader,
  useThree,
  useFrame,
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


import Demon from './components/Demon.jsx';
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

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
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



const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxPolarAngle={Math.PI / 2.01}
      minPolarAngle={Math.PI /4}
      maxAzimuthAngle={Infinity}
      minAzimuthAngle={Infinity}
    />
  );
};

function App() {
  const [boxes, setBoxes] = useState([]);
  const [box, setBox] = useState({ x: 0, y: 0, z: 0 });
  return (
    <>
      <Canvas camera={{ position: [150, 110, 100] }}>
        <CameraControls />
        <ambientLight intensity={0.5} />
        <Stars radius={300} />
        <Physics>
          {boxes.map((box, i) => {
            return <Box key={i} x={box.x} y={box.y} z={box.z} />;
          })}
          <Plane />
          <Sphere x={30} y={100} z={1} />
          <Demon position={-20,20,0 } />
        </Physics>
        <spotLight position={[0, 150, 111]} angle={Math.PI / 3} />
      </Canvas>
      <div id="controlNewBoxes">
        <span>New Box:</span>
        <span>
          X ---->
          <input
            type="number"
            max="100"
            min="0"
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
            max="100"
            min="0"
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
            max="100"
            min="0"
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
    </>
  );
}

export default App;
