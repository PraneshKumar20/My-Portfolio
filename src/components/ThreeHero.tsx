import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeHero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';

    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // Ambient and dynamic lighting
    const ambient = new THREE.AmbientLight(0x0a1628, 1.5);
    scene.add(ambient);

    // Inner core glowing point light
    const coreLight = new THREE.PointLight(0x7df9e5, 6, 8, 2);
    root.add(coreLight);

    // Orbiting cyan point light
    const cyanLight = new THREE.PointLight(0x7df9e5, 9, 14, 2);
    cyanLight.position.set(2.8, 2.0, 3.2);
    scene.add(cyanLight);

    // Orbiting purple point light
    const purpleLight = new THREE.PointLight(0xa58bff, 8, 14, 2);
    purpleLight.position.set(-2.8, -1.8, 2.5);
    scene.add(purpleLight);

    // 1. Faceted Glassmorphic Crystal Core (Icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(1.08, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0d1b2a,
      emissive: 0x091c26,
      emissiveIntensity: 0.85,
      roughness: 0.12,
      metalness: 0.15,
      transmission: 0.82,
      thickness: 1.1,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(coreMesh);

    // 2. Luminous Neon Wireframe Edges
    const edgesGeometry = new THREE.EdgesGeometry(coreGeometry);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x7df9e5,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const wireMesh = new THREE.LineSegments(edgesGeometry, wireMaterial);
    wireMesh.scale.setScalar(1.012);
    root.add(wireMesh);

    // 3. Inner Pulsing Sacred Geometry (Octahedron)
    const innerGeometry = new THREE.OctahedronGeometry(0.62, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xa58bff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    root.add(innerMesh);

    // 4. Delicate Planetary Gyroscope Rings
    const rings: THREE.Mesh[] = [];
    const ringSpecs = [
      { radius: 1.68, tube: 0.009, rotation: [0.42, 0.15, 0.25], speed: 0.32, color: 0x7df9e5, opacity: 0.55 },
      { radius: 2.05, tube: 0.007, rotation: [-0.35, 0.65, -0.2], speed: -0.22, color: 0xa58bff, opacity: 0.45 },
      { radius: 2.42, tube: 0.008, rotation: [0.95, 0.2, 0.75], speed: 0.16, color: 0x7df9e5, opacity: 0.35 },
    ];

    ringSpecs.forEach((spec) => {
      const ringGeo = new THREE.TorusGeometry(spec.radius, spec.tube, 12, 160);
      const ringMat = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: spec.opacity,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(...(spec.rotation as [number, number, number]));
      ring.userData.speed = spec.speed;
      root.add(ring);
      rings.push(ring);
    });

    // 5. Constellation Cosmic Stardust Field
    const particleCount = 180;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cyanColor = new THREE.Color(0x7df9e5);
    const purpleColor = new THREE.Color(0xa58bff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const mixedColor = Math.random() > 0.4 ? cyanColor : purpleColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    root.add(particles);

    // Perfectly center the 3D kinetic object in its dedicated container
    const basePosition = new THREE.Vector3(0, 0, 0);
    let targetScale = 0.95;

    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const normX = ((event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2));
      const normY = ((event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2));

      pointer.x = Math.max(-1.5, Math.min(1.5, normX));
      pointer.y = Math.max(-1.5, Math.min(1.5, normY));
      targetRotation.set(pointer.y * 0.35, pointer.x * 0.45);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;
      const aspect = width / height;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      basePosition.set(0, 0, 0);
      if (width < 340) {
        targetScale = 0.75;
      } else if (width < 420) {
        targetScale = 0.85;
      } else {
        targetScale = 0.95;
      }
    };
    onResize();

    let raf = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow + idle drift
      root.rotation.x += (targetRotation.x - root.rotation.x) * 0.045;
      root.rotation.y += (targetRotation.y - root.rotation.y) * 0.045;

      const targetX = basePosition.x + pointer.x * 0.25;
      const targetY = basePosition.y - pointer.y * 0.18 + Math.sin(elapsed * 0.85) * 0.07;
      const targetZ = basePosition.z;

      root.position.x += (targetX - root.position.x) * 0.04;
      root.position.y += (targetY - root.position.y) * 0.04;
      root.position.z += (targetZ - root.position.z) * 0.04;

      // Scale lerp
      const currentScale = root.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.05;
      root.scale.setScalar(newScale);

      // Core rotation & gentle breathing
      coreMesh.rotation.x += 0.0032;
      coreMesh.rotation.y += 0.0048;
      wireMesh.rotation.copy(coreMesh.rotation);

      // Counter-rotating inner sacred geometry
      innerMesh.rotation.x -= 0.0045;
      innerMesh.rotation.z += 0.0055;
      innerMesh.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.06);

      // Orbital rings rotation
      rings.forEach((ring) => {
        const speed = ring.userData.speed as number;
        ring.rotation.z += speed * 0.0042;
        ring.rotation.x += speed * 0.0018;
      });

      // Cosmic dust slow spin
      particles.rotation.y += 0.0007;
      particles.rotation.x = Math.sin(elapsed * 0.12) * 0.04;

      // Orbiting dynamic lighting for glass refraction
      cyanLight.position.x = 2.8 + Math.sin(elapsed * 0.7) * 1.2;
      cyanLight.position.y = 1.8 + Math.cos(elapsed * 0.55) * 0.9;
      purpleLight.position.x = -2.8 + Math.cos(elapsed * 0.6) * 1.1;
      purpleLight.position.y = -1.6 + Math.sin(elapsed * 0.65) * 0.8;

      coreLight.intensity = 5 + Math.sin(elapsed * 1.8) * 1.5;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const observer = new ResizeObserver(onResize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);

      // Thorough WebGL resource disposal
      coreGeometry.dispose();
      coreMaterial.dispose();
      edgesGeometry.dispose();
      wireMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();

      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="three-hero" aria-hidden="true" />;
}
