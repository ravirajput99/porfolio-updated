import { useCallback, useRef } from "react";
import * as THREE from "three";

/*
 * Three.js planet for the Hero section.
 * - Procedural planet surface (no external texture needed)
 * - Atmosphere glow layer
 * - Slow rotation + mouse parallax
 * - Callback ref pattern (safe with React StrictMode)
 */

export default function Planet() {
  const cleanupRef = useRef(null);
  const rafRef = useRef(null);

  const handleRef = useCallback((canvasEl) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (!canvasEl) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      1,
      0.1,
      100
    );
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(320, 320);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ---- Planet surface ----
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x0a1a2e,
      roughness: 0.6,
      metalness: 0.2,
      flatShading: false,
    });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Add surface detail via vertex displacement (subtle craters/terrain)
    const positions = geometry.attributes.position.array;
    const noiseOffsets = new Float32Array(positions.length / 3);
    for (let i = 0; i < noiseOffsets.length; i++) {
      noiseOffsets[i] = Math.random() * 0.02;
    }

    // ---- Atmosphere glow ----
    const atmosGeo = new THREE.SphereGeometry(1.18, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosphere);

    // ---- Lighting ----
    const ambient = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0x00f0ff, 1.5);
    sun.position.set(2, 2, 3);
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(-2, -1, -2);
    scene.add(fill);

    // ---- Mouse parallax ----
    const mouse = new THREE.Vector2(0, 0);

    function onMouseMove(event) {
      const rect = canvasEl.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    canvasEl.addEventListener("mousemove", onMouseMove);

    function animate(time = 0) {
      // Slow rotation
      planet.rotation.y += 0.002;
      planet.rotation.x += 0.001;

      // Atmosphere pulse
      atmosphere.material.opacity = 0.35 + Math.sin(time * 0.002) * 0.15;

      // Mouse parallax
      planet.rotation.y += (mouse.x * 0.01 - planet.rotation.y) * 0.05;
      planet.rotation.x += (mouse.y * 0.01 - planet.rotation.x) * 0.05;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    cleanupRef.current = () => {
      canvasEl.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <canvas ref={handleRef} className="planet-canvas" aria-label="3D planet" />
  );
}
