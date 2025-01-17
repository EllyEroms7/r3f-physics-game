import { Canvas } from "@react-three/fiber";
import Cannon from "./cannon";
import { Physics } from "@react-three/rapier";
import { Environment, OrbitControls } from "@react-three/drei";
import Ground from "./ground";
import { Suspense } from "react";
import Loading from "./loading";
import Tower from "./tower";
import { useControls } from "leva";

const Renderer = () => {
  const { mass, color, scale } = useControls({
    mass: { value: 2, min: 1, max: 4 },
    color: { value: "red" },
    scale: { value: 3, min: 1, max: 5 },
  });
  return (
    <div className="webgl">
      <Suspense fallback={<Loading />}>
        <Canvas camera={{ position: [0, 40, 50] }}>
          <Environment preset="city" />
          <OrbitControls />

          <Suspense fallback={null}>
            <Physics gravity={[0, -10, 0]}>
              <Cannon mass={mass} colour={color} scale={scale} />
              <Tower />
              <group
                position={[Math.random() * 30 - 15, 0, Math.random() * -20 - 7]}
              >
                <Tower />
              </group>

              <group
                position={[Math.random() * 50 - 25, 0, Math.random() * -20 - 7]}
              >
                <Tower />
              </group>

              <group
                position={[Math.random() * 60 - 30, 0, Math.random() * 20 + 7]}
              >
                <Tower />
              </group>

              <group
                position={[Math.random() * 70 - 35, 0, Math.random() * 20 + 7]}
              >
                <Tower />
              </group>

              <Ground />
            </Physics>
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Renderer;
