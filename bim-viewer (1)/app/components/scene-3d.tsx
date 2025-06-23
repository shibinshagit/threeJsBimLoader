"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, Grid } from "@react-three/drei"
import type { BIMViewerState, SkyPreset } from "./bim-viewer"
import * as THREE from "three"
import { CustomSky } from "./custom-sky"

interface Scene3DProps {
  state: BIMViewerState
  currentSkyData: SkyPreset | null
  onSelectionChange: (object: THREE.Object3D | null) => void
}

export function Scene3D({ state, currentSkyData, onSelectionChange }: Scene3DProps) {
  const { scene, camera, raycaster, pointer, gl } = useThree()
  const sectionPlaneRef = useRef<THREE.Plane>(new THREE.Plane())
  const skyGroupRef = useRef<THREE.Group>(null)
  const [skyRotation, setSkyRotation] = useState(0)

  // Update the lighting defaults when no sky is selected
  const defaultLighting = {
    lightIntensity: 0.8,
    lightColor: "#ffffff",
    ambientIntensity: 0.4,
  }

  const lighting = currentSkyData || defaultLighting

  // Close selection when selection mode is turned off
  useEffect(() => {
    if (!state.selectionMode && state.selectedObject) {
      console.log("Selection mode turned off, clearing selection")
      onSelectionChange(null)
      // Reset highlights only
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.emissive.setHex(0x000000)
            }
          })
        }
      })
    }
  }, [state.selectionMode, state.selectedObject, scene, onSelectionChange])

  // Setup global clipping planes for section plane
  useEffect(() => {
    if (state.sectionPlane.enabled) {
      const plane = new THREE.Plane()
      plane.setFromNormalAndCoplanarPoint(
        new THREE.Vector3(...state.sectionPlane.normal),
        new THREE.Vector3(...state.sectionPlane.position),
      )
      gl.clippingPlanes = [plane]
      gl.localClippingEnabled = true
      console.log("Section plane enabled:", plane)
    } else {
      gl.clippingPlanes = []
      gl.localClippingEnabled = false
      console.log("Section plane disabled")
    }
  }, [state.sectionPlane.enabled, state.sectionPlane.position, state.sectionPlane.normal, gl])

  // Animate sky rotation during transitions
  useFrame((_, delta) => {
    if (state.skyTransitioning) {
      setSkyRotation((prev) => prev + delta * 2)
    }
    if (skyGroupRef.current) {
      skyGroupRef.current.rotation.y = skyRotation
    }

    // Update section plane position in real-time
    if (state.sectionPlane.enabled) {
      const plane = sectionPlaneRef.current
      plane.setFromNormalAndCoplanarPoint(
        new THREE.Vector3(...state.sectionPlane.normal),
        new THREE.Vector3(...state.sectionPlane.position),
      )
      gl.clippingPlanes = [plane]
    }
  })

  // Handle click events for selection
  useEffect(() => {
    const handleCanvasClick = (event: MouseEvent) => {
      if (!state.selectionMode) {
        console.log("Selection mode is off")
        return
      }

      console.log("Canvas clicked, selection mode is on")

      // Calculate mouse position in normalized device coordinates
      const canvas = gl.domElement
      const rect = canvas.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      console.log("Mouse position:", { x, y })

      // Update raycaster
      raycaster.setFromCamera({ x, y }, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      console.log("Intersects found:", intersects.length)

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object
        console.log("Selected object:", selectedObject.name, selectedObject.type)
        onSelectionChange(selectedObject)

        // Remove previous highlights
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial) {
                material.emissive.setHex(0x000000)
              }
            })
          }
        })

        // Highlight selected object in red (no movement)
        if (selectedObject instanceof THREE.Mesh && selectedObject.material) {
          const materials = Array.isArray(selectedObject.material) ? selectedObject.material : [selectedObject.material]
          materials.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              // Red highlight for selection
              material.emissive.setHex(0xff0000)
              console.log("Applied red highlight to:", selectedObject.name)
            }
          })
        }
      } else {
        console.log("No object selected")
        onSelectionChange(null)
        // Remove all highlights
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            materials.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial) {
                material.emissive.setHex(0x000000)
              }
            })
          }
        })
      }
    }

    const canvas = gl.domElement
    canvas.addEventListener("click", handleCanvasClick)

    return () => {
      canvas.removeEventListener("click", handleCanvasClick)
    }
  }, [state.selectionMode, scene, camera, raycaster, gl, onSelectionChange])

  return (
    <>
      {/* Dynamic Environment / Sky */}
      <group ref={skyGroupRef}>
        {currentSkyData &&
          (currentSkyData.customImage ? (
            <CustomSky url={currentSkyData.customImage} />
          ) : (
            <Environment preset={currentSkyData.environment as any} background blur={0.1} />
          ))}
      </group>

      {/* Dynamic Lighting based on sky */}
      <ambientLight intensity={lighting.ambientIntensity} color={lighting.lightColor} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={lighting.lightIntensity}
        color={lighting.lightColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Additional atmospheric lighting */}
      <pointLight position={[-10, -10, -10]} intensity={lighting.ambientIntensity * 0.5} color={lighting.lightColor} />
      <pointLight position={[10, -10, 10]} intensity={lighting.ambientIntensity * 0.3} color={lighting.lightColor} />

      {/* Models */}
      {state.models.map((model) => (
        <ModelComponent
          key={model.id}
          url={model.url}
          visible={model.visible}
          wireframe={model.wireframe || state.viewMode === "wireframe" || state.blueprintMode}
          xray={state.viewMode === "xray"}
          blueprintMode={state.blueprintMode}
          sectionPlaneEnabled={state.sectionPlane.enabled}
        />
      ))}

      {/* Grid */}
      {state.showGrid && (
        <Grid args={[50, 50]} cellColor="#444444" sectionColor="#666666" fadeDistance={30} fadeStrength={1} />
      )}

      {/* Section Plane Visualization */}
      {state.sectionPlane.enabled && (
        <mesh position={state.sectionPlane.position}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial
            color="#ff4444"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      )}
    </>
  )
}

interface ModelComponentProps {
  url: string
  visible: boolean
  wireframe: boolean
  xray: boolean
  blueprintMode: boolean
  sectionPlaneEnabled: boolean
}

function ModelComponent({ url, visible, wireframe, xray, blueprintMode, sectionPlaneEnabled }: ModelComponentProps) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  // Apply material modifications
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((material) => {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.wireframe = wireframe
              material.transparent = xray
              material.opacity = xray ? 0.3 : 1
              material.depthWrite = !xray

              // Enable clipping for section plane
              if (sectionPlaneEnabled) {
                material.clippingPlanes = null // Use global clipping planes
                material.clipShadows = true
              } else {
                material.clippingPlanes = []
                material.clipShadows = false
              }

              // Blueprint mode styling
              if (blueprintMode) {
                material.color.setHex(0x0088ff)
                material.emissive.setHex(0x001122)
                material.wireframe = true
              } else if (!wireframe) {
                // Reset to original colors when not in blueprint mode
                material.color.setHex(0xffffff)
                material.emissive.setHex(0x000000)
              }
            }
          })
        }
      })
    }
  }, [wireframe, xray, blueprintMode, sectionPlaneEnabled])

  return <primitive ref={modelRef} object={scene.clone()} visible={visible} castShadow receiveShadow />
}
