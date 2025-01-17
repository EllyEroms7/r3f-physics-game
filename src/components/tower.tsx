import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";
import { useMemo } from "react";

const Tower = () => {
  const blockRows = 15; // Number of rows in the tower
  const blockPerRow = 5; // Number of blocks per row
  const blockWidth = 1.5; // Specific width of each block
  const blockHeight = 2; // Specific height of each block
  const blockDepth = 5; // Specific depth of each block
  const spacing = 0.1; // Spacing between blocks

  // Calculate positions for each block in the tower
  const instances = useMemo(() => {
    const positions: [number, number, number][] = [];

    for (let row = 0; row < blockRows; row++) {
      for (let col = 0; col < blockPerRow; col++) {
        const x =
          col * (blockWidth + spacing) -
          ((blockPerRow - 1) * (blockWidth + spacing)) / 2; // Center blocks horizontally
        const y = row * (blockHeight + spacing); // Stack blocks vertically
        const z = 0; // All blocks aligned on the Z-axis
        positions.push([x, y, z]);
      }
    }

    return positions;
  }, [blockRows, blockWidth, blockHeight, blockPerRow, spacing]);

  return (
    <InstancedRigidBodies colliders="cuboid" instances={[]}>
      {instances.map((position, index) => (
        <RigidBody key={index} position={position} mass={2}>
          <mesh>
            {/* Define the block geometry with specific dimensions */}
            <boxGeometry args={[blockWidth, blockHeight, blockDepth]} />
            <meshStandardMaterial color="saddlebrown" />
          </mesh>
        </RigidBody>
      ))}
    </InstancedRigidBodies>
  );
};

export default Tower;
