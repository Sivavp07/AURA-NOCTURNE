import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Wind, ShoppingBag, Eye, Sun, Moon, Check, ShieldCheck } from 'lucide-react';
import { FragranceVariation, ScentNote } from '../types';
import { AudioEngine } from '../utils/audioEngine';

interface ThreePerfumeModelProps {
  selectedVariation: FragranceVariation;
  activeNote: ScentNote | null;
  onSelectVariation: (variation: FragranceVariation) => void;
  onAddToCart: (variation: FragranceVariation) => void;
  onOpenEngravingModal?: () => void;
}

export default function ThreePerfumeModel({
  selectedVariation,
  activeNote,
  onSelectVariation,
  onAddToCart
}: ThreePerfumeModelProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isCapLifted, setIsCapLifted] = useState(false);
  const [lightingPreset, setLightingPreset] = useState<'amethyst' | 'gold' | 'noir' | 'dawn'>('amethyst');
  const [spraying, setSpraying] = useState(false);

  // References to three objects for interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);
  const capMeshRef = useRef<THREE.Group | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const mistSystemRef = useRef<THREE.Points | null>(null);
  const ambientParticlesRef = useRef<THREE.Points | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 5.2);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfcf3eb, 2.9);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.DirectionalLight(0xd8b4fe, 3.4);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const bottomGlow = new THREE.PointLight(0xa855f7, 1.4, 10);
    bottomGlow.position.set(0, -1.8, 0);
    scene.add(bottomGlow);

    // MAIN BOTTLE GROUP
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;
    bottleGroup.position.y = -0.3;

    // --- MATERIALS ---
    // 1. Crystal Glass Outer Flacon
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.05,
      ior: 1.58, // Lead crystal index of refraction
      reflectivity: 0.9,
      thickness: 0.8,
      specularColor: new THREE.Color(0xfff3d0),
      specularIntensity: 1.0,
      envMapIntensity: 1.5
    });

    // 2. Liquid Elixir Inside
    const liquidColorHex = activeNote ? activeNote.colorHex : selectedVariation.liquidColor;
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(liquidColorHex),
      transmission: 0.65,
      transparent: true,
      roughness: 0.1,
      ior: 1.38,
      thickness: 1.2,
      emissive: new THREE.Color(liquidColorHex),
      emissiveIntensity: 0.12
    });

    // 3. 24K Polished Gold Metal
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xdeb841,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 2.0
    });

    // 4. Matte Brushed Gold Accent
    const brushedGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc49b2f,
      metalness: 0.85,
      roughness: 0.38
    });

    // --- GEOMETRY ---
    // Outer Glass Body: Heavy Octagonal Faceted Prism
    const bodyGeometry = new THREE.CylinderGeometry(0.85, 0.95, 2.1, 8, 1);
    const glassBodyMesh = new THREE.Mesh(bodyGeometry, glassMaterial);
    glassBodyMesh.position.y = 0.5;
    bottleGroup.add(glassBodyMesh);

    // Heavy Glass Solid Base (thick crystal floor)
    const baseGeometry = new THREE.CylinderGeometry(0.95, 0.98, 0.45, 8, 1);
    const glassBaseMesh = new THREE.Mesh(baseGeometry, glassMaterial);
    glassBaseMesh.position.y = -0.7;
    bottleGroup.add(glassBaseMesh);

    // Inner Liquid Column
    const liquidGeometry = new THREE.CylinderGeometry(0.68, 0.76, 1.7, 8, 1);
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = 0.45;
    bottleGroup.add(liquidMesh);
    liquidMeshRef.current = liquidMesh;

    // Glass Shoulder Transition
    const shoulderGeometry = new THREE.ConeGeometry(0.85, 0.35, 8);
    const shoulderMesh = new THREE.Mesh(shoulderGeometry, glassMaterial);
    shoulderMesh.position.y = 1.7;
    bottleGroup.add(shoulderMesh);

    // Gold Collar / Neck Ring
    const collarGeometry = new THREE.CylinderGeometry(0.38, 0.42, 0.35, 16);
    const collarMesh = new THREE.Mesh(collarGeometry, goldMaterial);
    collarMesh.position.y = 1.95;
    bottleGroup.add(collarMesh);

    // Atomizer Inner Stem (Visible when cap is lifted)
    const stemGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12);
    const stemMesh = new THREE.Mesh(stemGeometry, brushedGoldMaterial);
    stemMesh.position.y = 2.2;
    bottleGroup.add(stemMesh);

    const nozzleGeometry = new THREE.CylinderGeometry(0.18, 0.2, 0.25, 12);
    const nozzleMesh = new THREE.Mesh(nozzleGeometry, goldMaterial);
    nozzleMesh.position.y = 2.38;
    bottleGroup.add(nozzleMesh);

    // Gold Guilloché Stopper / Cap Group (Can be animated upwards)
    const capGroup = new THREE.Group();
    bottleGroup.add(capGroup);
    capMeshRef.current = capGroup;

    // Main Cap Body (Sculptural crown)
    const capGeometry = new THREE.CylinderGeometry(0.48, 0.52, 0.85, 8);
    const capMesh = new THREE.Mesh(capGeometry, goldMaterial);
    capMesh.position.y = 2.5;
    capGroup.add(capMesh);

    // Cap Faceted Finial Top
    const finialGeometry = new THREE.OctahedronGeometry(0.35, 0);
    const finialMesh = new THREE.Mesh(finialGeometry, goldMaterial);
    finialMesh.position.y = 3.05;
    finialMesh.rotation.y = Math.PI / 4;
    capGroup.add(finialMesh);

    // Embossed Front Gold Plaque Label
    const labelGeometry = new THREE.PlaneGeometry(0.9, 0.55);
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.5,
      metalness: 0.3
    });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.set(0, 0.5, 0.88);
    bottleGroup.add(labelMesh);

    // Label Gold Border Rim
    const borderGeom = new THREE.RingGeometry(0.46, 0.5, 4);
    const borderMesh = new THREE.Mesh(borderGeom, goldMaterial);
    borderMesh.position.set(0, 0.5, 0.89);
    bottleGroup.add(borderMesh);

    // AMBIENT GOLD DUST FLOATING PARTICLES
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 4.5;
      posArray[i + 1] = (Math.random() - 0.5) * 4.5;
      posArray[i + 2] = (Math.random() - 0.5) * 4.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xf3e5ab,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const ambientParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(ambientParticles);
    ambientParticlesRef.current = ambientParticles;

    // SPRAY MIST PARTICLES
    const mistCount = 350;
    const mistGeo = new THREE.BufferGeometry();
    const mistPos = new Float32Array(mistCount * 3);
    const mistVelocities: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < mistCount; i++) {
      mistPos[i * 3] = 0;
      mistPos[i * 3 + 1] = 2.4;
      mistPos[i * 3 + 2] = 0;
      mistVelocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: 0.05 + Math.random() * 0.08,
        z: (Math.random() - 0.5) * 0.04
      });
    }
    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
    const mistMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xfff6dc,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const mistPoints = new THREE.Points(mistGeo, mistMat);
    scene.add(mistPoints);
    mistSystemRef.current = mistPoints;

    // DRAG ROTATION CONTROLS
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !bottleGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      bottleGroupRef.current.rotation.y += deltaX * 0.008;
      bottleGroupRef.current.rotation.x += deltaY * 0.004;
      // Clamp vertical tilt
      bottleGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, bottleGroupRef.current.rotation.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !bottleGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      bottleGroupRef.current.rotation.y += deltaX * 0.01;
      bottleGroupRef.current.rotation.x += deltaY * 0.005;
      bottleGroupRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, bottleGroupRef.current.rotation.x));

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height || 550;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let animationFrameId: number;
    let mistActiveTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotation if enabled and not dragging
      if (isRotating && !isDragging && bottleGroupRef.current) {
        bottleGroupRef.current.rotation.y += 0.0035;
      }

      // Floating dust rotation
      if (ambientParticlesRef.current) {
        ambientParticlesRef.current.rotation.y -= 0.0012;
        ambientParticlesRef.current.rotation.x += 0.0006;
      }

      // Mist spray update
      if (mistSystemRef.current && mistSystemRef.current.material instanceof THREE.PointsMaterial) {
        if (mistSystemRef.current.material.opacity > 0.01) {
          const positions = mistSystemRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < mistCount; i++) {
            positions[i * 3] += mistVelocities[i].x;
            positions[i * 3 + 1] += mistVelocities[i].y;
            positions[i * 3 + 2] += mistVelocities[i].z;
          }
          mistSystemRef.current.geometry.attributes.position.needsUpdate = true;
          mistSystemRef.current.material.opacity -= 0.012;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Liquid Material Color when variation or active note changes
  useEffect(() => {
    if (liquidMeshRef.current) {
      const targetHex = activeNote ? activeNote.colorHex : selectedVariation.liquidColor;
      const mat = liquidMeshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.set(targetHex);
      mat.emissive.set(targetHex);
    }
  }, [selectedVariation, activeNote]);

  // Handle Cap Lift / Exploded View
  useEffect(() => {
    if (capMeshRef.current) {
      const targetY = isCapLifted ? 1.0 : 0;
      // Smoothly animate position
      capMeshRef.current.position.y = targetY;
    }
  }, [isCapLifted]);

  // Handle Lighting Preset
  const applyLighting = (preset: 'amethyst' | 'gold' | 'noir' | 'dawn') => {
    setLightingPreset(preset);
    AudioEngine.playTactileClick();
    if (!keyLightRef.current || !rimLightRef.current) return;

    if (preset === 'amethyst') {
      keyLightRef.current.color.set(0xfcf3eb);
      keyLightRef.current.intensity = 2.9;
      rimLightRef.current.color.set(0xd8b4fe);
      rimLightRef.current.intensity = 3.4;
    } else if (preset === 'gold') {
      keyLightRef.current.color.set(0xffecd0);
      keyLightRef.current.intensity = 2.8;
      rimLightRef.current.color.set(0xd4af37);
      rimLightRef.current.intensity = 3.2;
    } else if (preset === 'noir') {
      keyLightRef.current.color.set(0x8fa3b5);
      keyLightRef.current.intensity = 1.4;
      rimLightRef.current.color.set(0xa855f7);
      rimLightRef.current.intensity = 2.4;
    } else if (preset === 'dawn') {
      keyLightRef.current.color.set(0xffcfb0);
      keyLightRef.current.intensity = 3.2;
      rimLightRef.current.color.set(0xe67e50);
      rimLightRef.current.intensity = 3.5;
    }
  };

  // Trigger Fragrance Mist Spray
  const triggerSpray = () => {
    AudioEngine.playMistSpray();
    setSpraying(true);

    if (mistSystemRef.current) {
      const mat = mistSystemRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.85;

      const positions = mistSystemRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 0.1;
        positions[i * 3 + 1] = 2.45 + Math.random() * 0.1;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      }
      mistSystemRef.current.geometry.attributes.position.needsUpdate = true;
    }

    setTimeout(() => {
      setSpraying(false);
    }, 800);
  };

  return (
    <section id="flacon-3d" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-transparent border-b border-purple-500/20 overflow-hidden">
      {/* Background Radial Purple Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(168,85,247,0.12),transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-400/35 bg-[#170930]/75 text-purple-200 text-[11px] uppercase tracking-[0.25em] font-medium mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Eye className="w-3.5 h-3.5 text-purple-300" />
            <span>Interactive 360° Crystal Flacon</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.14em] uppercase">
            The Sculpted Masterpiece
          </h2>
          <p className="font-serif-luxury italic text-lg sm:text-xl text-purple-200/90 mt-2">
            “Drag to rotate 360°, inspect optical facets, atomize the fragrance mist, or lift the 24K gold stopper.”
          </p>
        </div>

        {/* Active Note Feedback Banner (if user tapped a scent note above) */}
        {activeNote && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mb-6 px-4 py-2 rounded-full border border-purple-400/40 bg-[#16082c]/85 backdrop-blur-md flex items-center justify-between text-xs shadow-[0_0_20px_rgba(192,132,252,0.2)]"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_#c084fc]"
                style={{ backgroundColor: activeNote.colorHex }}
              />
              <span className="text-neutral-300">
                Aura Infused: <strong className="text-white font-cinzel">{activeNote.name}</strong>
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300">
              Refracting in Flacon
            </span>
          </motion.div>
        )}

        {/* Main 3D Stage & Variation Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Model Canvas Container */}
          <div className="lg:col-span-8 relative">
            <div className="relative rounded-3xl overflow-hidden border border-purple-400/25 bg-gradient-to-b from-[#14082c]/75 via-[#0e041e]/80 to-[#070110]/90 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
              {/* Three.js canvas mount point */}
              <div
                ref={mountRef}
                className="w-full h-[450px] sm:h-[550px] cursor-grab active:cursor-grabbing"
              />

              {/* Floating 3D Interaction Toolbar */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
                {/* Auto-Rotation Toggle */}
                <button
                  id="toggle-rotation-btn"
                  onClick={() => {
                    AudioEngine.playTactileClick();
                    setIsRotating(!isRotating);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md border transition-all cursor-pointer ${
                    isRotating
                      ? 'bg-purple-900/40 border-purple-400/60 text-purple-200 shadow-[0_0_12px_rgba(192,132,252,0.25)]'
                      : 'bg-[#120724]/70 border-white/15 text-neutral-400 hover:text-white'
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                  <span>{isRotating ? 'Orbit Active' : 'Orbit Paused'}</span>
                </button>

                {/* Cap Lift / Exploded View */}
                <button
                  id="toggle-cap-lift-btn"
                  onClick={() => {
                    AudioEngine.playCrystalChime(1100);
                    setIsCapLifted(!isCapLifted);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md border transition-all cursor-pointer ${
                    isCapLifted
                      ? 'bg-gradient-to-r from-[#eed9b3] to-[#dfb676] text-black font-semibold border-amber-300'
                      : 'bg-[#120724]/70 border-purple-400/30 text-purple-200 hover:border-purple-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isCapLifted ? 'Replace Cap' : 'Lift 24K Cap'}</span>
                </button>

                {/* Lighting Presets */}
                <div className="flex items-center gap-1 bg-[#120724]/80 backdrop-blur-md p-1 rounded-full border border-purple-400/20 text-xs">
                  <button
                    id="light-amethyst-btn"
                    onClick={() => applyLighting('amethyst')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest cursor-pointer transition-colors ${
                      lightingPreset === 'amethyst' ? 'bg-purple-600 text-white font-bold shadow-[0_0_10px_#a855f7]' : 'text-purple-300/70 hover:text-white'
                    }`}
                  >
                    Améthyste
                  </button>
                  <button
                    id="light-gold-btn"
                    onClick={() => applyLighting('gold')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest cursor-pointer transition-colors ${
                      lightingPreset === 'gold' ? 'bg-[#eed9b3] text-black font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Atelier Or
                  </button>
                  <button
                    id="light-noir-btn"
                    onClick={() => applyLighting('noir')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest cursor-pointer transition-colors ${
                      lightingPreset === 'noir' ? 'bg-purple-900 text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Minuit
                  </button>
                  <button
                    id="light-dawn-btn"
                    onClick={() => applyLighting('dawn')}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest cursor-pointer transition-colors ${
                      lightingPreset === 'dawn' ? 'bg-rose-900/60 text-rose-200 font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Aube
                  </button>
                </div>
              </div>

              {/* Bottom Mist Atomizer Trigger Button */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <button
                  id="atomize-spray-btn"
                  onClick={triggerSpray}
                  disabled={spraying}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black font-cinzel text-xs uppercase tracking-[0.25em] font-bold shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Wind className={`w-4 h-4 text-black ${spraying ? 'animate-ping' : ''}`} />
                  <span>{spraying ? 'Atomizing Elixir...' : 'Spray Fragrance Mist'}</span>
                </button>
              </div>

              {/* Subtle Touch Instruction Prompt */}
              <div className="absolute bottom-2 left-6 text-[10px] font-mono text-purple-300/70 uppercase tracking-widest pointer-events-none hidden sm:block">
                360° Drag • Scroll to zoom
              </div>
            </div>
          </div>

          {/* Right Column: Selected Flacon Specification & Direct Acquisition */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            <div className="bg-[#14082c]/65 border border-purple-400/25 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-2xl relative">
              {/* Limited Edition Stamp */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-purple-900/30 text-purple-200 border border-purple-400/30">
                  {selectedVariation.edition}
                </span>
                <span className="text-[10px] font-mono text-purple-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                  {selectedVariation.stockCount} Flacons Remaining
                </span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-medium text-white tracking-wide">
                {selectedVariation.name}
              </h3>
              <p className="font-serif-luxury italic text-sm text-purple-300 mt-0.5">
                {selectedVariation.frenchTitle} — {selectedVariation.subtitle}
              </p>

              <p className="text-xs text-neutral-300 font-light mt-3 leading-relaxed">
                {selectedVariation.description}
              </p>

              {/* Specification Table */}
              <div className="mt-4 pt-4 border-t border-purple-500/20 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span className="font-mono text-[11px]">Volume:</span>
                  <span className="text-white font-medium">{selectedVariation.volume}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span className="font-mono text-[11px]">Vessel:</span>
                  <span className="text-neutral-200 text-right max-w-[200px]">{selectedVariation.vessel}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span className="font-mono text-[11px]">Concentration:</span>
                  <span className="text-[#eed9b3] font-mono text-[11px]">{selectedVariation.concentration}</span>
                </div>
              </div>

              {/* Variation Perks list */}
              <div className="mt-4 pt-3 border-t border-purple-500/10 space-y-1.5">
                {selectedVariation.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-neutral-300">
                    <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Price & Immediate Add to Bag CTA */}
              <div className="mt-6 pt-5 border-t border-purple-400/25 flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wider">
                    ${selectedVariation.price.toLocaleString()}
                  </span>
                  <span className="block text-[9px] font-mono text-purple-300/80 uppercase">
                    White-Glove Insured Delivery
                  </span>
                </div>

                <button
                  id="flacon-add-to-bag-btn"
                  onClick={() => {
                    AudioEngine.playCrystalChime(880);
                    onAddToCart(selectedVariation);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-200 hover:opacity-95 text-black font-cinzel text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire Flacon</span>
                </button>
              </div>
            </div>

            {/* Authenticity Certificate Seal Box */}
            <div className="bg-[#120724]/60 border border-purple-400/20 rounded-2xl p-4 flex items-center gap-3 text-xs text-neutral-400 backdrop-blur-xl">
              <ShieldCheck className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-neutral-200 font-medium font-cinzel text-xs">
                  Maison Guarantee of Authenticity
                </p>
                <p className="text-[11px] leading-relaxed text-neutral-400">
                  Each flacon is numbered and recorded in our Paris Ledger with a signed compounding certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
