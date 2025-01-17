import { Sphere } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";

/**
 * Physics-based cannon object that moves forward when the Enter key is pressed
 *
 * Props: Force(30), Torque(force/2), mass(2),colour(hotpink),scale(1.5)
 */

interface ForceProps {
  mass: number;
  colour: string;
  scale: number;
}

const Cannon = (props: ForceProps) => {
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
              x: (x.current as number) * -(props.mass * 60), //force
              y: (y.current as number) * -(props.mass * 60),
              z: (z.current as number) * -(props.mass * 60),
            },
            true
          );

          // Apply a torque impulse to create a rotation
          canonRef.current.applyTorqueImpulse(
            { x: 0, y: props.mass * 6, z: 0 },
            true
          );

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
  }, [camera.position.z, camera.position.x, camera.position.y, props.mass]);

  return (
    <>
      {init ? (
        <group>
          <RigidBody
            ref={canonRef}
            position={[camera.position.x, camera.position.y, camera.position.z]}
            type="dynamic"
            mass={props.mass} //mass
          >
            <Sphere scale={[props.scale, props.scale, props.scale]}>
              <meshStandardMaterial color={props.colour} /> {/*colour*/}
            </Sphere>
          </RigidBody>
        </group>
      ) : null}
    </>
  );
};

export default Cannon;
