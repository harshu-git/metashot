import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function SpatialMotionCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(0, 220, 360);
    camera.lookAt(0, 0, 0);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return; // WebGL not available
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Particle Grid Wave Parameters ---
    const cols = 55;
    const rows = 45;
    const spacing = 22;
    const numParticles = cols * rows;

    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    const color1 = new THREE.Color(0x6366f1); // Indigo
    const color2 = new THREE.Color(0xa855f7); // Purple
    const color3 = new THREE.Color(0x38bdf8); // Sky blue
    const tempColor = new THREE.Color();

    let i = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iy = 0; iy < rows; iy++) {
        const x = (ix - cols / 2) * spacing;
        const z = (iy - rows / 2) * spacing;
        const y = 0;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Color blend based on coordinates
        const ratioX = ix / cols;
        const ratioY = iy / rows;
        const blend = (ratioX + ratioY) * 0.5;
        if (blend < 0.5) {
          tempColor.lerpColors(color1, color2, blend * 2);
        } else {
          tempColor.lerpColors(color2, color3, (blend - 0.5) * 2);
        }

        // Modulate alpha/brightness based on distance from center
        const distFromCenter = Math.sqrt(x * x + z * z) / 600;
        const brightness = Math.max(0.15, 1.0 - distFromCenter * 0.85);

        colors[i * 3] = tempColor.r * brightness;
        colors[i * 3 + 1] = tempColor.g * brightness;
        colors[i * 3 + 2] = tempColor.b * brightness;

        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite texture (soft radial glow circle)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
      gradient.addColorStop(0.7, 'rgba(165, 180, 252, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 4.5,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic pointer tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      targetX = (e.clientX - width / 2) * 0.25;
      targetY = (e.clientY - height / 2) * 0.25;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetX = (e.touches[0].clientX - width / 2) * 0.2;
        targetY = (e.touches[0].clientY - height / 2) * 0.2;
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Window Resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let count = 0;
    const render = () => {
      count += 0.025;

      // Lerp mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = 220 - mouseY * 0.5;
      camera.lookAt(0, 0, 0);

      const pos = geometry.attributes.position.array as Float32Array;

      let idx = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          // Complex organic undulating wave formula
          const wave1 = Math.sin((ix * 0.25) + count) * 16;
          const wave2 = Math.cos((iy * 0.25) + count) * 16;
          const wave3 = Math.sin((ix + iy) * 0.15 + count * 0.8) * 10;
          
          pos[idx * 3 + 1] = wave1 + wave2 + wave3;
          idx++;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-45"
      aria-hidden="true"
    />
  );
}

export default SpatialMotionCanvas;
