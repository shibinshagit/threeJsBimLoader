"use client"

import { useMemo } from "react"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

interface CustomSkyProps {
  url: string
}

/**
 * Renders an equirectangular JPG/PNG as a background sky.
 * Scaled to ―1 on X so the texture appears on the inside.
 */
export function CustomSky({ url }: CustomSkyProps) {
  const texture = useTexture(url)
  texture.colorSpace = THREE.SRGBColorSpace

  // Prevents the sky from receiving shadows or affecting depth
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [texture],
  )

  return (
    <mesh material={material} scale={[-1, 1, 1]}>
      {/* Huge sphere so camera is always inside */}
      <sphereGeometry args={[500, 64, 64]} />
    </mesh>
  )
}
