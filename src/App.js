import React, { useState, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";

extend({
  OrbitControls,
});

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => {
    orbitRef.current.update();
  });
  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Plane = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="red" />
  </mesh>
);

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "hotpink" : "gray",
  });

  return (
    <a.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 5, 10]} penumbra={1} />
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <fog attach="fog" args={["white", 10, 20]} />
      <Controls />
      <Box />
      <Plane />
    </Canvas>
  );
};

export default App;
