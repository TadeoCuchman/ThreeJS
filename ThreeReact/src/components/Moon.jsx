import {useRef} from 'react'
import { useSphere } from '@react-three/cannon';
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";


export function Moon({ x, y, z }) {
  const colorMap = useLoader(TextureLoader, "/moon.jpg");
  const ref = useRef()
  useFrame((state) => ref.current.rotation.y += 0.009  );


  // const [ref, api] = useSphere(() => ({ position: [x, y, z] }));
  return (
    <>
      <mesh
        ref={ref}
        // rotation={[Math.PI / 2, Math.PI / 2, 0]}
        position={[50, 140, -100]}
      >
        <sphereGeometry attach="geometry" args={[30, 50, 100]}></sphereGeometry>
        <meshLambertMaterial
          attach="material"
          color="white"
          map={colorMap}
          transparent
        ></meshLambertMaterial>
      </mesh>
      <spotLight
        position={[50, 140, 100]}
        intensity={2}
        angle={Math.PI}

      />
    </>
  );
}
