import * as THREE from "three";
import { useGLTF, Text } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh;
    defaultMaterial_1: THREE.Mesh;
    defaultMaterial_2: THREE.Mesh;
    defaultMaterial_3: THREE.Mesh;
    defaultMaterial_4: THREE.Mesh;

    // Add any other nodes as needed
  };
  materials: {
    Walkie: THREE.Material;
    Glass: THREE.Material;
    Metal: THREE.Material;
    material: THREE.Material;
    Wires: THREE.Material;
    // Add any other materials if needed
  };
};

function Bomb({ timerText, ...props }: { timerText: string }) {
  const { nodes, scene, materials } = useGLTF("/c4-bomb.glb") as any;

  return (
    <group rotation={[Math.PI / 2, 0, 0]} {...props}>
      <primitive
        object={scene}
        scale={0.04} // Adjust as needed
        position={[0, -1, 0]} // Optional tweak
      />
        {/* Add a flat black plane to simulate screen */}
        <mesh position={[0, -0.4, -2.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.7, 0.8]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Red countdown text on screen */}
      <Text
        position={[0.05, -0.3, -2.45]} // slightly in front of the plane
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.43}
        color="red"
        anchorX="center"
        anchorY="top"
        font={"/fonts/digital-7.ttf"}
      >
        {timerText}
      </Text>
    </group>
  );
}

export default Bomb;

useGLTF.preload("/c4-bomb.glb");
