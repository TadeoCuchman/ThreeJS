import React, {useRef} from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

export const CameraControls = () => {
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
      maxPolarAngle={Math.PI }
      minPolarAngle={Math.PI / 4}
      maxAzimuthAngle={Infinity}
      minAzimuthAngle={Infinity}
      maxDistance={200}
      minDistance={10}
      zoomSpeed={0.15}
      
    />
  );
};

