import { Plane } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const Ground = () => {
  return (
    <>
      <RigidBody type="fixed">
        <Plane
          args={[100, 100]}
          position={[0, -1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="green" />
        </Plane>
      </RigidBody>
    </>
  );
};

export default Ground;
