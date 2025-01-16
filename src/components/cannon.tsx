import { Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";

/**
 * Physics-based cannon object that moves forward when the Enter key is pressed
 *
 * Props: Force(30), Torque(force/2), mass(2),colour(hotpink),scale(1.5)
 */

const Cannon = () => {
  const canonRef = useRef<RapierRigidBody>(null);
  const [init, setInit] = useState(false);

  const { camera } = useThree();
  const z = useRef<number | null>(null);
  const x = useRef<number | null>(null);
  const y = useRef<number | null>(null);

  useEffect(() => {
    // Update the camera's current position on each render
    z.current = camera.position.z;
    x.current = camera.position.x;
    y.current = camera.position.y;

    // Handle keydown event for the Enter key
    const handleKeyDown = (e: KeyboardEvent): void => {
      e.preventDefault();
      if (e.key === "Enter") {
        //initialize rendering
        setInit(true);
      }
    };

    // Handle keyup event for the Enter key
    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "Enter") {
        if (canonRef.current) {
          // Apply an impulse to the object to move it forward
          canonRef.current.applyImpulse(
            {
              x: (x.current as number) * -30, //force
              y: (y.current as number) * -30,
              z: (z.current as number) * -30,
            },
            true
          );

          // Apply a torque impulse to create a rotation
          canonRef.current.applyTorqueImpulse({ x: 10, y: 10, z: 10 }, true);

          // Reset forces and torques on the object
          canonRef.current.resetForces(true);
          canonRef.current.resetTorques(true);
        }
        // Reset initialization state after 4 seconds
        setTimeout(() => {
          setInit(false);
        }, 4000);
      }
    };

    // Add event listeners for keydown and keyup
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up event listeners on component unmount or dependency change
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera.position.z, camera.position.x, camera.position.y]);

  return (
    <>
      {init ? (
        <group>
          <RigidBody
            ref={canonRef}
            position={[camera.position.x, camera.position.y, camera.position.z]}
            type="dynamic"
            mass={2} //mass
          >
            <Sphere scale={[1.5, 1.5, 1.5]}>
              <meshStandardMaterial color="hotpink" /> {/*colour*/}
            </Sphere>
          </RigidBody>
        </group>
      ) : null}
    </>
  );
};

export default Cannon;
