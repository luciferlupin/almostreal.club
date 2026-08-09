import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GraphicSplashCanvasProps {
  progress: number; // 0 to 100
}

export const GraphicSplashCanvas: React.FC<GraphicSplashCanvasProps> = ({ progress }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Three.js Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. High-Tech Graphic Mesh: Liquid Chrome Ring & Particle Tunnel
    const splashGroup = new THREE.Group();

    // 2A. Liquid Chrome 3D Torus Ring
    const torusGeo = new THREE.TorusGeometry(1.2, 0.15, 32, 100);
    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      reflectivity: 1.0
    });

    const chromeRing = new THREE.Mesh(torusGeo, chromeMat);
    splashGroup.add(chromeRing);

    // 2B. Outer Wireframe Geometry Ring
    const outerGeo = new THREE.IcosahedronGeometry(2.0, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xbfc0c2,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    splashGroup.add(outerMesh);

    // 2C. 3D Particle Vortex Tunnel (500 Particles)
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 8;

      particlePositions[i * 3] = Math.cos(theta) * radius;
      particlePositions[i * 3 + 1] = Math.sin(theta) * radius;
      particlePositions[i * 3 + 2] = z;

      particleScales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    splashGroup.add(particleSystem);

    // 2D. Studio Lights
    const light1 = new THREE.DirectionalLight(0xffffff, 3.5);
    light1.position.set(4, 5, 4);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xbfc0c2, 4.0, 10);
    light2.position.set(-3, -2, 2);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    scene.add(splashGroup);

    // 3. Animation Loop with Motion Graphic Physics
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Dynamic graphic rotation & scale based on splash progress
      const progressRatio = progress / 100;

      chromeRing.rotation.x = elapsedTime * 1.5;
      chromeRing.rotation.y = elapsedTime * 2.0;

      outerMesh.rotation.x = -elapsedTime * 0.8;
      outerMesh.rotation.y = -elapsedTime * 1.2;
      outerMesh.scale.setScalar(1 + progressRatio * 0.8);

      // Particle speed acceleration
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += (0.04 + progressRatio * 0.12);
        if (positions[i * 3 + 2] > 4) {
          positions[i * 3 + 2] = -4;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Camera zoom pulse
      camera.position.z = THREE.MathUtils.lerp(4.5, 2.8, progressRatio);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, [progress]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
