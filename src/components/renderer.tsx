import { Canvas } from "@react-three/fiber";
import Cannon from "./cannon";
import { Physics } from "@react-three/rapier";
import { Environment, OrbitControls } from "@react-three/drei";
import Ground from "./ground";
import { Suspense } from "react";
import Loading from "./loading";

const Renderer = () => {
  return (
    <div className="webgl">
      <Suspense fallback={<Loading />}>
        <Canvas>
          <Environment preset="city" />
          <OrbitControls />

          <Suspense fallback={null}>
            <Physics gravity={[0, -10, 0]} debug>
              <Cannon />
              <Ground />
            </Physics>
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Renderer;
