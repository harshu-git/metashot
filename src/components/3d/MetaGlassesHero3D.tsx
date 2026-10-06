import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Glasses, Sparkles, Orbit } from 'lucide-react';

export function MetaGlassesHero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Verify WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    // Renderer with High DPI capping for 60-120fps performance
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0x221c3b, 1.8);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Vivid Indigo Rim Light
    const rimLightIndigo = new THREE.DirectionalLight(0x818cf8, 3.5);
    rimLightIndigo.position.set(-6, 3, -4);
    scene.add(rimLightIndigo);

    // Neon Pink/Purple Accent Light
    const accentLightPink = new THREE.PointLight(0xf43f5e, 3.0, 15);
    accentLightPink.position.set(3, -2, -3);
    scene.add(accentLightPink);

    // Front soft fill
    const fillLight = new THREE.PointLight(0xa5b4fc, 1.2, 10);
    fillLight.position.set(0, -1, 4);
    scene.add(fillLight);

    // --- Procedural 3D Meta Smart Glasses Model ---
    const glassesGroup = new THREE.Group();
    scene.add(glassesGroup);

    // Materials
    // Matte Obsidian Frame Material (Ray-Ban Wayfarer style)
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x111115,
      roughness: 0.25,
      metalness: 0.1,
    });

    // Dark Polarized Sunglass Lens Material
    const lensMaterial = new THREE.MeshStandardMaterial({
      color: 0x08080f,
      roughness: 0.08,
      metalness: 0.85,
    });

    // Hardware Sensor Lens Material (Camera optics)
    const cameraSensorMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a192f,
      roughness: 0.1,
      metalness: 0.9,
    });

    // Metallic Titanium Hinge Accent
    const metalAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.2,
      metalness: 0.95,
    });

    // Meta LED Capture Ring Material (signature glowing capture ring)
    const ledGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    // Helper: Rounded Rectangle Curve for Rim Shape
    function createRoundedRimShape(width: number, height: number, radius: number) {
      const shape = new THREE.Shape();
      const x = -width / 2;
      const y = -height / 2;
      shape.moveTo(x + radius, y);
      shape.lineTo(x + width - radius, y);
      shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius);
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height);
      shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);
      return shape;
    }

    const rimWidth = 1.45;
    const rimHeight = 1.15;
    const rimRadius = 0.35;
    const rimThickness = 0.18;

    // Create Left & Right Rims with Extrusion
    const outerShape = createRoundedRimShape(rimWidth, rimHeight, rimRadius);
    const innerHole = createRoundedRimShape(rimWidth - rimThickness, rimHeight - rimThickness, rimRadius - 0.08);
    outerShape.holes.push(innerHole);

    const extrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const rimGeometry = new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
    rimGeometry.center();

    // Left Rim
    const leftRim = new THREE.Mesh(rimGeometry, frameMaterial);
    leftRim.position.set(-1.05, 0, 0);
    glassesGroup.add(leftRim);

    // Right Rim
    const rightRim = new THREE.Mesh(rimGeometry, frameMaterial);
    rightRim.position.set(1.05, 0, 0);
    glassesGroup.add(rightRim);

    // Tinted Lenses (Thin extruded shape inside each rim)
    const lensShape = createRoundedRimShape(rimWidth - rimThickness + 0.04, rimHeight - rimThickness + 0.04, rimRadius - 0.06);
    const lensGeom = new THREE.ExtrudeGeometry(lensShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    });
    lensGeom.center();

    const leftLens = new THREE.Mesh(lensGeom, lensMaterial);
    leftLens.position.set(-1.05, 0, 0.02);
    glassesGroup.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeom, lensMaterial);
    rightLens.position.set(1.05, 0, 0.02);
    glassesGroup.add(rightLens);

    // Key Bridge Connecting Lenses
    const bridgeGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.68, 16);
    const bridge = new THREE.Mesh(bridgeGeom, frameMaterial);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.22, 0.06);
    glassesGroup.add(bridge);

    // Bridge Arch
    const archGeom = new THREE.TorusGeometry(0.35, 0.045, 12, 24, Math.PI);
    const arch = new THREE.Mesh(archGeom, frameMaterial);
    arch.rotation.z = Math.PI;
    arch.position.set(0, 0.15, 0.06);
    glassesGroup.add(arch);

    // Front Camera Sensors (Ray-Ban Meta Ultra-wide 12MP Camera at the corners)
    const sensorGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.08, 24);
    sensorGeom.rotateX(Math.PI / 2);

    // Right Front Corner Camera Sensor (the active lens)
    const rightCameraSensor = new THREE.Mesh(sensorGeom, cameraSensorMaterial);
    rightCameraSensor.position.set(1.68, 0.42, 0.15);
    glassesGroup.add(rightCameraSensor);

    const rightCameraRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.09, 0.02, 12, 32),
      metalAccentMaterial
    );
    rightCameraRing.position.set(1.68, 0.42, 0.19);
    glassesGroup.add(rightCameraRing);

    // Left Front Corner LED Ring (Meta's signature white/blue recording indicator)
    const leftLed = new THREE.Mesh(sensorGeom, cameraSensorMaterial);
    leftLed.position.set(-1.68, 0.42, 0.15);
    glassesGroup.add(leftLed);

    const leftLedRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.02, 12, 32),
      ledGlowMaterial
    );
    leftLedRing.position.set(-1.68, 0.42, 0.19);
    glassesGroup.add(leftLedRing);

    // Temples (Arms extending backwards in 3D perspective)
    const templeLength = 2.8;
    const templeGeom = new THREE.BoxGeometry(0.12, 0.16, templeLength);
    templeGeom.translate(0, 0, -templeLength / 2);

    const leftTemple = new THREE.Mesh(templeGeom, frameMaterial);
    leftTemple.position.set(-1.75, 0.38, 0);
    leftTemple.rotation.y = -0.08;
    glassesGroup.add(leftTemple);

    const rightTemple = new THREE.Mesh(templeGeom, frameMaterial);
    rightTemple.position.set(1.75, 0.38, 0);
    rightTemple.rotation.y = 0.08;
    glassesGroup.add(rightTemple);

    // Metallic Hinges at temples
    const hingeGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.14, 16);
    const leftHinge = new THREE.Mesh(hingeGeom, metalAccentMaterial);
    leftHinge.position.set(-1.76, 0.38, -0.05);
    glassesGroup.add(leftHinge);

    const rightHinge = new THREE.Mesh(hingeGeom, metalAccentMaterial);
    rightHinge.position.set(1.76, 0.38, -0.05);
    glassesGroup.add(rightHinge);

    // --- Holographic Reticle Ring orbiting the camera in 3D space ---
    const reticleRingGeom = new THREE.RingGeometry(0.25, 0.27, 48);
    const reticleRingMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const reticleRing = new THREE.Mesh(reticleRingGeom, reticleRingMat);
    reticleRing.position.set(1.68, 0.42, 0.32);
    glassesGroup.add(reticleRing);

    // Outer Target Bracket Ring
    const targetBracketGeom = new THREE.RingGeometry(0.38, 0.40, 4, 1, 0, Math.PI * 1.5);
    const targetBracketMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const targetBracket = new THREE.Mesh(targetBracketGeom, targetBracketMat);
    targetBracket.position.set(1.68, 0.42, 0.35);
    glassesGroup.add(targetBracket);

    // Subtle 3D floating dust motes / optical particles around the glasses
    const particleCount = 60;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Initial slight rotation angle for dramatic 3D hero perspective
    glassesGroup.rotation.x = 0.12;
    glassesGroup.rotation.y = -0.25;

    // --- Interaction Physics ---
    let targetRotationX = 0.12;
    let targetRotationY = -0.25;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.75;
      targetRotationX = -y * 0.55 + 0.1;
      setIsInteracting(true);
    };

    const handleMouseLeave = () => {
      targetRotationX = 0.12;
      targetRotationY = -0.25;
      setIsInteracting(false);
    };

    // Mobile touch tracking
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY = x * 0.65;
        targetRotationX = -y * 0.45 + 0.1;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth floating oscillation
        glassesGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.09;
        glassesGroup.position.x = Math.cos(elapsedTime * 0.9) * 0.05;

        // Smooth Lerp towards target interaction angles
        glassesGroup.rotation.x += (targetRotationX - glassesGroup.rotation.x) * 0.06;
        glassesGroup.rotation.y += (targetRotationY - glassesGroup.rotation.y) * 0.06;

        // Orbiting HUD reticles
        reticleRing.rotation.z = -elapsedTime * 0.8;
        targetBracket.rotation.z = elapsedTime * 1.2;

        // Subtle pulsing scale on HUD
        const reticlePulse = 1 + Math.sin(elapsedTime * 3) * 0.06;
        reticleRing.scale.set(reticlePulse, reticlePulse, 1);

        // Particle floating drift
        particleSystem.rotation.y = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects & geometries
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-6 sm:my-8 group select-none">
      {/* 3D Viewport Frame */}
      <div 
        ref={mountRef}
        className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] rounded-3xl glass-panel border border-white/[0.12] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing backdrop-blur-2xl"
        style={{ touchAction: 'pan-y' }}
        aria-label="Interactive 3D Ray-Ban Meta Smart Glasses Model"
        role="region"
      >
        {/* Holographic HUD Overlay Elements */}
        {/* Top-left Telemetry Header */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-white/[0.1] text-[11px] font-mono text-indigo-300">
            <Glasses className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold tracking-wider">RAY-BAN META GEN 2</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE 3D
          </span>
        </div>

        {/* Top-right Interactive Indicator */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border text-[11px] font-mono transition-all duration-300 ${
            isInteracting 
              ? 'border-indigo-400/50 bg-indigo-500/15 text-indigo-300 shadow-md shadow-indigo-500/10' 
              : 'border-white/[0.08] text-zinc-400'
          }`}>
            <Orbit className={`w-3.5 h-3.5 ${isInteracting ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden sm:inline">{isInteracting ? '3D TRACKING ACTIVE' : 'DRAG OR HOVER 3D'}</span>
            <span className="sm:hidden">3D</span>
          </div>
        </div>

        {/* Floating Telemetry Chips in 3D Viewport */}
        {/* Bottom-left: Sensor Optics */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex flex-col gap-1.5 pointer-events-none font-mono text-[10px]">
          <div className="glass-pill px-3 py-1.5 rounded-xl border border-white/[0.08] text-zinc-300 flex items-center gap-2">
            <span className="text-indigo-400 font-semibold">OPTICS:</span>
            <span>12MP Ultra-wide • f/2.2 • 2.2mm</span>
          </div>
          <div className="glass-pill px-3 py-1 rounded-xl border border-white/[0.08] text-zinc-400 flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">SPINVIEW:</span>
            <span>Motion Depth Active</span>
          </div>
        </div>

        {/* Bottom-right: Resolution Badge */}
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none font-mono">
          <div className="glass-pill px-3.5 py-1.5 rounded-xl border border-white/[0.1] text-xs text-white flex items-center gap-2 shadow-lg shadow-black/40">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-bold tracking-tight">3024 × 4032 NATIVE</span>
          </div>
        </div>

        {/* Center Optical Grid Reticle Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-dashed border-indigo-400 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute w-48 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
          <div className="absolute h-48 w-px bg-gradient-to-b from-transparent via-indigo-400 to-transparent" />
        </div>

        {/* Fallback if WebGL unavailable */}
        {!hasWebGL && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <Glasses className="w-16 h-16 text-indigo-400 mb-3" />
            <h4 className="text-white font-bold text-lg">Ray-Ban Meta Smart Glasses</h4>
            <p className="text-zinc-400 text-xs max-w-sm mt-1">
              Dual 12MP Ultra-wide camera sensors, f/2.2 aperture, native 3024×4032 Instagram Story format.
            </p>
          </div>
        )}
      </div>

      {/* 3D Motion Caption */}
      <div className="flex items-center justify-between px-2 pt-2.5 text-[11px] font-mono text-zinc-500">
        <span>GPU-Accelerated 3D Hardware Viewport</span>
        <span className="hidden sm:inline">WebGL • 60/120 FPS Real-time Shaders</span>
      </div>
    </div>
  );
}

export default MetaGlassesHero3D;
