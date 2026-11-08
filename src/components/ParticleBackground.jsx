import { useCallback, useRef } from "react";
import * as THREE from "three";

/*
 * Deep-space Three.js background.
 * - Deep space gradient canvas (dark purple/blue → near-black)
 * - Layered star field: distant small twinkling stars + medium stars + a few bright "glow" stars
 * - Floating dust particles that drift slowly (parallax depth layers)
 * - Very slow camera drift for a floating-through-space feel
 * - Full-screen canvas behind content; clicks pass through
 */

export default function CosmicBackground() {
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
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020205, 1);

    // ---- Pitch black background ----
    scene.background = new THREE.Color(0x000000);
    renderer.setClearColor(0x000000, 1);

    // ---- Round particle texture (soft glowing circle) ----
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const pctx = particleCanvas.getContext("2d");
    if (pctx) {
      const gradient = pctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.6)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      pctx.fillStyle = gradient;
      pctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    // ---- Helper to build a star layer ----
    function createStarLayer(count, spread, sizeRange, color, opacityRange) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const opacities = new Float32Array(count);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * spread;
        positions[i + 1] = (Math.random() - 0.5) * spread;
        positions[i + 2] = (Math.random() - 0.5) * spread * 0.6;
      }

      for (let i = 0; i < count; i++) {
        sizes[i] = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
        opacities[i] =
          Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0];
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));

      const material = new THREE.PointsMaterial({
        color,
        map: particleTexture,
        transparent: true,
        depthWrite: false,
        vertexColors: false,
      });

      const stars = new THREE.Points(geometry, material);
      stars.userData = { opacities, baseOpacity: opacityRange[0] };
      scene.add(stars);
      return stars;
    }

    // Distant tiny stars (deepest layer)
    const distantStars = createStarLayer(
      500,
      500,
      [0.6, 1.1],
      0xffffff,
      [0.15, 0.45]
    );
    // Medium stars
    const mediumStars = createStarLayer(
      180,
      420,
      [1.2, 2.2],
      0x9fdfff,
      [0.4, 0.75]
    );
    // Bright / glow stars (fewer, larger)
    const brightStars = createStarLayer(
      35,
      340,
      [2.4, 4.0],
      0x00f0ff,
      [0.6, 1.0]
    );

    // ---- Floating dust particles (slow drift, subtle) ----
    const dustCount = 120;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities = new Float32Array(dustCount * 3);
    const dustOpacities = new Float32Array(dustCount);

    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 600;
      dustPositions[i + 1] = (Math.random() - 0.5) * 400;
      dustPositions[i + 2] = (Math.random() - 0.5) * 200;
      dustVelocities[i] = (Math.random() - 0.5) * 0.015;
      dustVelocities[i + 1] = (Math.random() - 0.5) * 0.01;
      dustVelocities[i + 2] = (Math.random() - 0.5) * 0.008;
      dustOpacities[i / 3] = Math.random() * 0.25 + 0.05;
    }

    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );
    dustGeometry.setAttribute("opacity", new THREE.BufferAttribute(dustOpacities, 1));

    const dustMaterial = new THREE.PointsMaterial({
      color: 0x66ccff,
      map: particleTexture,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const dust = new THREE.Points(dustGeometry, dustMaterial);
    dust.userData = { velocities: dustVelocities };
    scene.add(dust);

    // ---- Mouse parallax ----
    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector3(0, 0, 0);

    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize);

    let lastTime = 0;

    function animate(time = 0) {
      const dt = time - lastTime;
      lastTime = time;

      // Slow camera drift
      target.x = mouse.x * 12;
      target.y = mouse.y * 9;
      camera.position.x += (target.x - camera.position.x) * 0.003;
      camera.position.y += (target.y - camera.position.y) * 0.003;
      camera.position.z += Math.sin(time * 0.0008) * 0.04;
      camera.lookAt(scene.position);

      // Twinkle distant & medium stars
      [distantStars, mediumStars, brightStars].forEach((layer) => {
        const opacities = layer.userData.opacities;
        const base = layer.userData.baseOpacity;
        const array = layer.geometry.attributes.opacity.array;
        for (let i = 0; i < array.length; i++) {
          array[i] =
            base + Math.sin(time * 0.002 + i * 0.7) * 0.25 + Math.random() * 0.08;
        }
        layer.geometry.attributes.opacity.needsUpdate = true;
      });

      // Drift dust particles slowly
      const dustPositionsArr = dust.geometry.attributes.position.array;
      const dustVelocitiesArr = dust.userData.velocities;
      const dustCountLocal = dustPositionsArr.length / 3;
      for (let i = 0; i < dustCountLocal * 3; i += 3) {
        dustPositionsArr[i] += dustVelocitiesArr[i];
        dustPositionsArr[i + 1] += dustVelocitiesArr[i + 1];
        dustPositionsArr[i + 2] += dustVelocitiesArr[i + 2];

        if (Math.abs(dustPositionsArr[i]) > 320) dustVelocitiesArr[i] *= -1;
        if (Math.abs(dustPositionsArr[i + 1]) > 220) dustVelocitiesArr[i + 1] *= -1;
        if (Math.abs(dustPositionsArr[i + 2]) > 120) dustVelocitiesArr[i + 2] *= -1;
      }
      dust.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }

    animate();

    cleanupRef.current = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      renderer.forceContextLoss();
      particleTexture.dispose();
    };
  }, []);

  return (
    <canvas ref={handleRef} className="cosmic-canvas" aria-hidden="true" />
  );
}
