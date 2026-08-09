import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDHandbagCanvasProps {
  unrealMode?: boolean;
  unrealRatio?: number; // 0 = REAL, 1 = UNREAL
  interactive?: boolean;
  className?: string;
  onHoverStateChange?: (hovered: boolean) => void;
}

export const ThreeDHandbagCanvas: React.FC<ThreeDHandbagCanvasProps> = ({
  unrealRatio = 0,
  className = 'w-full h-full'
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 1. Three.js WebGL Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. High-End Studio Lighting (PBR Specular & Chrome Rim Lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 4, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const metallicRimLight = new THREE.DirectionalLight(0xbfc0c2, 3.2);
    metallicRimLight.position.set(-4, 3, 2);
    scene.add(metallicRimLight);

    const bottomGlowLight = new THREE.PointLight(0xffffff, 1.5, 8);
    bottomGlowLight.position.set(0, -2.5, 3);
    scene.add(bottomGlowLight);

    // 3. Construct Photorealistic 3D Handbag Structure Group
    const mainGroup = new THREE.Group();

    // 3A. Load Photorealistic High-Res Texture Map & Create 3D Projection Mesh
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load('/assets/carry_real.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;

      // 3B. Detailed Subdivided 3D Front & Back Geometry (128x128 grid)
      const aspect = texture.image.width / texture.image.height;
      const planeWidth = 2.8;
      const planeHeight = planeWidth / aspect;

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 128, 128);
      const posAttr = geometry.attributes.position;

      // 3C. Procedural 3D Depth Map (Sculpting leather body volume, top handle curve, and chrome lock z-offset)
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);

        // Distance from center for volumetric leather rounding
        const distFromCenter = Math.sqrt(x * x + y * y);
        let zDepth = Math.cos(distFromCenter * 0.8) * 0.28;

        // Top Handle 3D Extrusion (y > 0.4)
        if (y > 0.35 && Math.abs(x) < 0.85) {
          zDepth += 0.25 * Math.sin((y - 0.35) * Math.PI);
        }

        // Center Chrome Lock Clasp 3D Extrusion (around y = -0.15, x = 0)
        if (Math.abs(x) < 0.25 && Math.abs(y + 0.15) < 0.25) {
          zDepth += 0.14;
        }

        posAttr.setZ(i, zDepth);
      }

      geometry.computeVertexNormals();

      // 3D Front Mesh with PBR Physical Material
      const frontMaterial = new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        roughness: 0.35,
        metalness: 0.2,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
        reflectivity: 0.8,
        side: THREE.FrontSide
      });

      const frontMesh = new THREE.Mesh(geometry, frontMaterial);
      frontMesh.position.z = 0.15;
      mainGroup.add(frontMesh);

      // 3D Back Mesh with subtle shadow curve
      const backMaterial = new THREE.MeshPhysicalMaterial({
        map: texture,
        transparent: true,
        roughness: 0.5,
        metalness: 0.1,
        side: THREE.BackSide
      });
      const backMesh = new THREE.Mesh(geometry, backMaterial);
      backMesh.position.z = -0.15;
      backMesh.rotation.y = Math.PI;
      mainGroup.add(backMesh);

      // 3D Side Gusset Panels (Leather Sides)
      const sideGeo = new THREE.BoxGeometry(0.3, planeHeight * 0.75, 0.3);
      const sideMat = new THREE.MeshStandardMaterial({ color: 0x090909, roughness: 0.4 });
      
      const leftSide = new THREE.Mesh(sideGeo, sideMat);
      leftSide.position.set(-planeWidth / 2 + 0.15, -0.1, 0);
      mainGroup.add(leftSide);

      const rightSide = new THREE.Mesh(sideGeo, sideMat);
      rightSide.position.set(planeWidth / 2 - 0.15, -0.1, 0);
      mainGroup.add(rightSide);
    });

    // 3D Unreal Mode Floating Chromatic Cubes
    const unrealCubes: THREE.Mesh[] = [];
    const cubeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const chromeWireMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.0,
      wireframe: true
    });

    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(cubeGeo, chromeWireMat);
      cube.position.set(
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 3.5,
        (Math.random() - 0.5) * 3.0
      );
      cube.visible = false;
      scene.add(cube);
      unrealCubes.push(cube);
    }

    scene.add(mainGroup);

    // 4. Mouse Tracking & Smooth Interactive Rotation
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / height) * 2 - 1);
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;

      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        mainGroup.rotation.y += deltaX * 0.012;
        mainGroup.rotation.x += deltaY * 0.012;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseRef.current.targetX = ((touch.clientX - rect.left) / width) * 2 - 1;
        mouseRef.current.targetY = -(((touch.clientY - rect.top) / height) * 2 - 1);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchmove', handleTouchMove);

    // 5. Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. 60 FPS Render Loop with Smooth Physics Spring Inertia
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating oscillation & mouse tracking response
      if (!mouseRef.current.isDragging) {
        mainGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.06;
        mainGroup.rotation.y += (mouseRef.current.targetX * 0.5 - mainGroup.rotation.y) * 0.06;
        mainGroup.rotation.x += (-mouseRef.current.targetY * 0.35 - mainGroup.rotation.x) * 0.06;
      }

      // Unreal mode shift
      if (unrealRatio > 0) {
        mainGroup.rotation.z = Math.sin(elapsedTime * 2) * 0.05 * unrealRatio;
        unrealCubes.forEach((cube, i) => {
          cube.visible = unrealRatio > 0.15;
          cube.rotation.x += 0.025 * (i + 1);
          cube.rotation.y += 0.02 * (i + 1);
          cube.position.y += Math.sin(elapsedTime * 2 + i) * 0.006;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [unrealRatio]);

  return (
    <div
      ref={mountRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
};
