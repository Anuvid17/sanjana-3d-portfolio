import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronUp,
  Boxes,
  Layers,
  Network,
  Cpu,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react';

interface ThreeDPortfolioProps {
  onSelectProject?: (project: ProjectItem) => void;
  isFullScreenMode?: boolean;
  onToggleFullScreen?: () => void;
}

export default function ThreeDPortfolio({
  onSelectProject,
  isFullScreenMode = false,
  onToggleFullScreen,
}: ThreeDPortfolioProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<'core' | 'data' | 'learning' | 'intelligence'>('intelligence');
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [activeCamPreset, setActiveCamPreset] = useState<'orbit' | 'isometric' | 'top' | 'close'>('orbit');
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [layerSpacing, setLayerSpacing] = useState(0.2);

  // Mutable Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const neuralCoreRef = useRef<THREE.Mesh | null>(null);
  const layerGroupsRef = useRef<{ id: string; group: THREE.Group; radius: number }[]>([]);
  const layerRingsRef = useRef<THREE.Mesh[]>([]);
  const satelliteNodesRef = useRef<{ mesh: THREE.Mesh; project: ProjectItem; angle: number; radius: number }[]>([]);
  const attentionLinesRef = useRef<THREE.LineSegments | null>(null);
  const particleSystemRef = useRef<THREE.InstancedMesh | null>(null);
  const particleDataRef = useRef<{ x: number; y: number; z: number; speed: number; radius: number; angle: number; layer: number }[]>([]);
  const materialsRef = useRef<THREE.Material[]>([]);

  // Camera and drag state
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 5.0));
  const cameraDistanceRef = useRef<number>(5.0);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0.002, y: 0.002 });
  const isAutoRotatingRef = useRef(true);
  const layerSpacingRef = useRef(0.2);

  isAutoRotatingRef.current = isAutoRotating;
  layerSpacingRef.current = layerSpacing;

  // Zoom Handler
  const handleZoom = useCallback((direction: 'in' | 'out', step = 0.6) => {
    if (!cameraRef.current || !targetCamPosRef.current) return;
    const currentDist = targetCamPosRef.current.length();
    const newDist = direction === 'in' ? Math.max(2.6, currentDist - step) : Math.min(7.6, currentDist + step);
    targetCamPosRef.current.normalize().multiplyScalar(newDist);
    cameraDistanceRef.current = newDist;
  }, []);

  // Camera presets
  const applyCameraPreset = useCallback((preset: 'orbit' | 'isometric' | 'top' | 'close') => {
    setActiveCamPreset(preset);
    if (!targetCamPosRef.current) return;
    switch (preset) {
      case 'orbit':
        targetCamPosRef.current.set(0, 1.8, 5.0);
        break;
      case 'isometric':
        targetCamPosRef.current.set(3.8, 3.2, 3.8);
        break;
      case 'top':
        targetCamPosRef.current.set(0, 5.4, 0.2);
        break;
      case 'close':
        targetCamPosRef.current.set(0, 0.8, 3.0);
        break;
    }
    cameraDistanceRef.current = targetCamPosRef.current.length();
  }, []);

  // Focus a specific neural layer smoothly
  const focusLayer = useCallback((layerId: 'core' | 'data' | 'learning' | 'intelligence') => {
    setSelectedLayerId(layerId);
    if (!targetCamPosRef.current) return;
    switch (layerId) {
      case 'core':
        targetCamPosRef.current.set(0, 0.6, 3.0);
        break;
      case 'data':
        targetCamPosRef.current.set(1.5, 1.2, 3.4);
        break;
      case 'learning':
        targetCamPosRef.current.set(2.4, 1.8, 4.0);
        break;
      case 'intelligence':
        targetCamPosRef.current.set(0, 2.0, 5.0);
        break;
    }
  }, []);

  // WebGL Lifecycle Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per Three.js skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x06080d, 0.045);

    // 2. Camera Setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.0);
    cameraRef.current = camera;
    cameraDistanceRef.current = camera.position.length();

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.replaceChildren(renderer.domElement);

    // 4. Lighting & Environment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    const keyLight = new THREE.DirectionalLight(0xaad4ff, 2.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x4e85bf, 1.4);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0x89aacc, 0x07090e, 0.85);
    scene.add(hemiLight);

    const corePointLight = new THREE.PointLight(0x89aacc, 3.0, 4.5);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // Ground Grid & Floor Shadow
    const gridHelper = new THREE.GridHelper(14, 28, 0x1f2e42, 0x0b111a);
    gridHelper.position.y = -1.45;
    scene.add(gridHelper);

    const shadowGeo = new THREE.CircleGeometry(2.3, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020407,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.44;
    scene.add(shadowMesh);
    materialsRef.current.push(shadowMat);

    // 5. Build Compact Neural Structure
    const rootNeuralGroup = new THREE.Group();
    scene.add(rootNeuralGroup);

    // (A) Central Glowing Neural Core
    const coreGroup = new THREE.Group();
    rootNeuralGroup.add(coreGroup);

    const coreGeo = new THREE.SphereGeometry(0.48, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x89aacc,
      emissive: 0x22487a,
      emissiveIntensity: 0.8,
      metalness: 0.85,
      roughness: 0.15,
      wireframe: false,
    });
    materialsRef.current.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.userData = { id: 'core', type: 'core', label: 'Neural Core (Latent Space)' };
    coreGroup.add(coreMesh);
    neuralCoreRef.current = coreMesh;

    // Crystalline icosahedron cage
    const cageGeo = new THREE.IcosahedronGeometry(0.65, 0);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xc4ddff,
      emissive: 0x4e85bf,
      emissiveIntensity: 0.45,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: true,
    });
    materialsRef.current.push(cageMat);
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // (B) Three Concentric Rotating Layers
    layerGroupsRef.current = [];
    layerRingsRef.current = [];
    satelliteNodesRef.current = [];

    const layersConfig = [
      {
        id: 'data',
        label: 'Data Layer (Embeddings & Tensors)',
        radius: 1.35,
        color: 0x2dd4bf,
        emissive: 0x0f4e45,
        tiltX: 0.35,
        tiltY: 0.2,
        rotationSpeed: 0.005,
        nodeCount: 6,
        nodeType: 'octahedron',
      },
      {
        id: 'learning',
        label: 'Learning Layer (PPO & Optimization)',
        radius: 2.1,
        color: 0x818cf8,
        emissive: 0x242468,
        tiltX: -0.4,
        tiltY: 0.3,
        rotationSpeed: -0.004,
        nodeCount: 8,
        nodeType: 'dodecahedron',
      },
      {
        id: 'intelligence',
        label: 'Intelligence Layer (Real-time Inference)',
        radius: 2.85,
        color: 0x38bdf8,
        emissive: 0x123c5c,
        tiltX: 0.25,
        tiltY: -0.25,
        rotationSpeed: 0.003,
        nodeCount: 3,
        nodeType: 'project',
      },
    ];

    layersConfig.forEach((cfg) => {
      const layerGroup = new THREE.Group();
      layerGroup.userData = { id: cfg.id, speed: cfg.rotationSpeed, baseRadius: cfg.radius };
      layerGroup.rotation.x = cfg.tiltX;
      layerGroup.rotation.y = cfg.tiltY;
      rootNeuralGroup.add(layerGroup);
      layerGroupsRef.current.push({ id: cfg.id, group: layerGroup, radius: cfg.radius });

      // Concentric Torus Ring
      const ringGeo = new THREE.TorusGeometry(cfg.radius, 0.02, 16, 72);
      const ringMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85,
      });
      materialsRef.current.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.userData = { id: cfg.id, type: 'layer', label: cfg.label };
      layerGroup.add(ringMesh);
      layerRingsRef.current.push(ringMesh);

      // Add nodes along ring
      if (cfg.id === 'intelligence') {
        PROJECTS.forEach((proj, idx) => {
          const angle = (idx * Math.PI * 2) / PROJECTS.length;
          const nodeGroup = new THREE.Group();

          const satGeo = new THREE.OctahedronGeometry(0.24, 0);
          const satMat = new THREE.MeshStandardMaterial({
            color: idx === 0 ? 0x60a5fa : idx === 1 ? 0x34d399 : 0xa78bfa,
            emissive: idx === 0 ? 0x22487a : idx === 1 ? 0x105538 : 0x442277,
            emissiveIntensity: 0.7,
            metalness: 0.9,
            roughness: 0.15,
          });
          materialsRef.current.push(satMat);
          const satMesh = new THREE.Mesh(satGeo, satMat);
          satMesh.userData = { id: proj.id, type: 'project', project: proj, label: `${proj.title} (Click to inspect)` };
          nodeGroup.add(satMesh);

          const subOrbitGeo = new THREE.RingGeometry(0.32, 0.35, 24);
          const subOrbitMat = new THREE.MeshBasicMaterial({
            color: satMat.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5,
          });
          materialsRef.current.push(subOrbitMat);
          const subOrbit = new THREE.Mesh(subOrbitGeo, subOrbitMat);
          subOrbit.rotation.x = Math.PI / 2;
          nodeGroup.add(subOrbit);

          const x = Math.cos(angle) * cfg.radius;
          const z = Math.sin(angle) * cfg.radius;
          nodeGroup.position.set(x, 0, z);
          layerGroup.add(nodeGroup);

          satelliteNodesRef.current.push({
            mesh: satMesh,
            project: proj,
            angle,
            radius: cfg.radius,
          });
        });
      } else {
        const nodeMat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          emissive: cfg.color,
          emissiveIntensity: 0.5,
          metalness: 0.8,
          roughness: 0.2,
        });
        materialsRef.current.push(nodeMat);

        for (let i = 0; i < cfg.nodeCount; i++) {
          const angle = (i * Math.PI * 2) / cfg.nodeCount;
          const nodeGeo =
            cfg.nodeType === 'octahedron'
              ? new THREE.OctahedronGeometry(0.09, 0)
              : new THREE.DodecahedronGeometry(0.1, 0);

          const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
          const x = Math.cos(angle) * cfg.radius;
          const z = Math.sin(angle) * cfg.radius;
          const y = Math.sin(i * 1.5) * 0.1;
          nodeMesh.position.set(x, y, z);
          nodeMesh.userData = { id: cfg.id, type: 'layer-node', label: cfg.label };
          layerGroup.add(nodeMesh);
        }
      }
    });

    // (C) Dynamic Attention Connections
    const attentionLineCount = 20;
    const linePositions = new Float32Array(attentionLineCount * 2 * 3);
    const lineColors = new Float32Array(attentionLineCount * 2 * 3);

    for (let i = 0; i < attentionLineCount; i++) {
      const idx = i * 6;
      linePositions[idx] = (Math.random() - 0.5) * 0.8;
      linePositions[idx + 1] = (Math.random() - 0.5) * 0.8;
      linePositions[idx + 2] = (Math.random() - 0.5) * 0.8;

      linePositions[idx + 3] = (Math.random() - 0.5) * 3.8;
      linePositions[idx + 4] = (Math.random() - 0.5) * 1.8;
      linePositions[idx + 5] = (Math.random() - 0.5) * 3.8;

      lineColors[idx] = 0.53;
      lineColors[idx + 1] = 0.66;
      lineColors[idx + 2] = 0.8;

      lineColors[idx + 3] = 0.3;
      lineColors[idx + 4] = 0.52;
      lineColors[idx + 5] = 0.75;
    }

    const attentionGeo = new THREE.BufferGeometry();
    attentionGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    attentionGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const attentionMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    materialsRef.current.push(attentionMat);

    const attentionLines = new THREE.LineSegments(attentionGeo, attentionMat);
    rootNeuralGroup.add(attentionLines);
    attentionLinesRef.current = attentionLines;

    // (D) Flowing Particles Through Neural Channels
    const particleCount = 130;
    const particleGeo = new THREE.SphereGeometry(0.022, 6, 6);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x99ccff,
      transparent: true,
      opacity: 0.85,
    });
    materialsRef.current.push(particleMat);

    const particleSystem = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    particleSystemRef.current = particleSystem;
    rootNeuralGroup.add(particleSystem);

    const pData: typeof particleDataRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.floor(Math.random() * 3);
      const radius = 0.6 + Math.random() * 2.4;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.8;
      pData.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 0.6,
        z: Math.sin(angle) * radius,
        speed,
        radius,
        angle,
        layer,
      });
    }
    particleDataRef.current = pData;

    // (E) Interaction & Raycasting (Hover, Drag & Zoom)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const interactables: THREE.Object3D[] = [];
      if (neuralCoreRef.current) interactables.push(neuralCoreRef.current);
      interactables.push(...layerRingsRef.current);
      interactables.push(...satelliteNodesRef.current.map((s) => s.mesh));

      const intersects = raycaster.intersectObjects(interactables, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const data = hit.userData;
        setHoveredEntity(data.label || data.id);
        container.style.cursor = 'pointer';
      } else {
        setHoveredEntity(null);
        container.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      }

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;
        rotationVelocityRef.current.y = deltaX * 0.005;
        rotationVelocityRef.current.x = deltaY * 0.005;
      }
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      container.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'grab';
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const interactables: THREE.Object3D[] = [];
      if (neuralCoreRef.current) interactables.push(neuralCoreRef.current);
      interactables.push(...layerRingsRef.current);
      interactables.push(...satelliteNodesRef.current.map((s) => s.mesh));

      const intersects = raycaster.intersectObjects(interactables, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const data = hit.userData;
        if (data.type === 'project' && data.project && onSelectProject) {
          onSelectProject(data.project);
        } else if (data.id) {
          setSelectedLayerId(data.id);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.003;
      if (targetCamPosRef.current) {
        const currentDist = targetCamPosRef.current.length();
        const newDist = Math.max(2.6, Math.min(7.6, currentDist + zoomDelta));
        targetCamPosRef.current.normalize().multiplyScalar(newDist);
        cameraDistanceRef.current = newDist;
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('click', handleClick);
    container.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // (F) Animation Loop
    let frameId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    const dummy = new THREE.Object3D();

    const animate = (currentTime: number = performance.now()) => {
      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;
      elapsed += delta;

      if (cameraRef.current && targetCamPosRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, delta * 4.0);
        cameraRef.current.lookAt(0, 0, 0);
      }

      if (!isDraggingRef.current) {
        if (isAutoRotatingRef.current) {
          rootNeuralGroup.rotation.y += 0.0035;
        }
      } else {
        rootNeuralGroup.rotation.y += rotationVelocityRef.current.y;
        rootNeuralGroup.rotation.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.y *= 0.94;
        rotationVelocityRef.current.x *= 0.94;
      }

      if (coreMesh) {
        const pulse = 1 + Math.sin(elapsed * 2.8) * 0.04;
        coreMesh.scale.setScalar(pulse);
        if (coreMesh.material instanceof THREE.MeshStandardMaterial) {
          coreMesh.material.emissiveIntensity = 0.65 + Math.sin(elapsed * 3) * 0.25;
        }
      }

      layerGroupsRef.current.forEach((layerItem, idx) => {
        const layer = layerItem.group;
        const speed = (layer.userData.speed as number) || 0.004;
        layer.rotation.z += speed;

        const spacingMultiplier = 1 + layerSpacingRef.current * (idx * 0.25);
        layer.scale.set(spacingMultiplier, spacingMultiplier, spacingMultiplier);
      });

      satelliteNodesRef.current.forEach((item, idx) => {
        const parent = item.mesh.parent;
        if (parent) {
          parent.rotation.y = elapsed * 0.8 + idx;
          parent.rotation.x = Math.sin(elapsed * 1.2 + idx) * 0.3;
        }
      });

      if (particleSystemRef.current && particleDataRef.current.length > 0) {
        const pArr = particleDataRef.current;
        for (let i = 0; i < pArr.length; i++) {
          const p = pArr[i];
          p.angle += delta * p.speed;
          p.radius += delta * 0.45;
          if (p.radius > 3.2) {
            p.radius = 0.55 + Math.random() * 0.4;
          }

          const px = Math.cos(p.angle) * p.radius;
          const pz = Math.sin(p.angle) * p.radius;
          const py = Math.sin(p.angle * 2 + i) * 0.2;

          dummy.position.set(px, py, pz);
          const pScale = 0.7 + (p.radius / 3.0) * 0.6;
          dummy.scale.setScalar(pScale);
          dummy.updateMatrix();
          particleSystemRef.current.setMatrixAt(i, dummy.matrix);
        }
        particleSystemRef.current.instanceMatrix.needsUpdate = true;
      }

      if (attentionLinesRef.current) {
        const lineMat = attentionLinesRef.current.material as THREE.LineBasicMaterial;
        lineMat.opacity = 0.25 + Math.sin(elapsed * 4.0) * 0.15;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('wheel', handleWheel);

      materialsRef.current.forEach((mat) => mat.dispose());
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectProject]);

  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as THREE.MeshStandardMaterial).wireframe = isWireframe;
      }
    });
  }, [isWireframe]);

  return (
    <section
      id="3d-portfolio"
      className={`relative w-full bg-[#06080d] overflow-hidden border-t border-stroke/60 ${
        isFullScreenMode ? 'fixed inset-0 z-[200] h-screen' : 'py-8 sm:py-12'
      }`}
    >
      <div className={`${isFullScreenMode ? 'h-full w-full' : 'max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12'}`}>
        {/* Compact Header */}
        {!isFullScreenMode && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-px bg-sky-400/60" />
                <span className="text-[11px] text-sky-400 uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  3D NEURAL STRUCTURE · ARCHITECTURAL REASONING
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-text-primary">
                Neural <span className="font-display italic text-sky-300">Architecture</span>
              </h2>
              <p className="text-xs text-muted mt-1 max-w-xl">
                Interactive 3D model showcasing the multi-layered neural network structure and real-time inference powering Sanjana&apos;s AI projects.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {onToggleFullScreen && (
                <button
                  onClick={onToggleFullScreen}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-text-primary bg-surface/90 hover:bg-surface border border-white/10 hover:border-white/30 transition-all cursor-pointer shadow-sm"
                  title="Expand Fullscreen 3D View"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-white/80" />
                  <span>Fullscreen</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3D Viewport Frame: Controlled height ~440px on desktop */}
        <div
          className={`relative rounded-2xl border border-white/10 bg-[#07090f] overflow-hidden shadow-2xl ${
            isFullScreenMode ? 'h-full w-full rounded-none border-none' : 'h-[400px] sm:h-[450px] md:h-[470px]'
          }`}
        >
          {/* Top Layer Selector Pills */}
          <div className="absolute top-3 left-3 sm:left-4 z-20 flex flex-wrap items-center gap-1.5 pointer-events-auto max-w-[calc(100%-80px)]">
            <button
              onClick={() => focusLayer('core')}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                selectedLayerId === 'core'
                  ? 'bg-white/20 text-white border-white/40 font-medium shadow-sm'
                  : 'bg-surface/80 text-muted hover:text-text-primary hover:bg-surface border-white/10'
              }`}
            >
              <Cpu className="w-3 h-3 text-white/80" />
              <span>Core</span>
            </button>

            <button
              onClick={() => focusLayer('data')}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                selectedLayerId === 'data'
                  ? 'bg-white/20 text-white border-white/40 font-medium shadow-sm'
                  : 'bg-surface/80 text-muted hover:text-text-primary hover:bg-surface border-white/10'
              }`}
            >
              <Layers className="w-3 h-3 text-white/80" />
              <span>Data Layer</span>
            </button>

            <button
              onClick={() => focusLayer('learning')}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                selectedLayerId === 'learning'
                  ? 'bg-white/20 text-white border-white/40 font-medium shadow-sm'
                  : 'bg-surface/80 text-muted hover:text-text-primary hover:bg-surface border-white/10'
              }`}
            >
              <Network className="w-3 h-3 text-white/80" />
              <span>Learning Layer</span>
            </button>

            <button
              onClick={() => focusLayer('intelligence')}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                selectedLayerId === 'intelligence'
                  ? 'bg-white/20 text-white border-white/40 font-medium shadow-sm'
                  : 'bg-surface/80 text-muted hover:text-text-primary hover:bg-surface border-white/10'
              }`}
            >
              <Sparkles className="w-3 h-3 text-white/80" />
              <span>Intelligence Layer</span>
            </button>
          </div>

          {/* Minimal Hover Feedback Pill */}
          {hoveredEntity && (
            <div className="absolute top-14 left-3 sm:left-4 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-white/20 text-xs text-white shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                <span className="font-medium text-white">{hoveredEntity}</span>
              </div>
            </div>
          )}

          {/* Top Right Quick Controls */}
          <div className="absolute top-3 right-3 sm:right-4 z-20 flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="p-1.5 rounded-full bg-surface/80 hover:bg-surface border border-white/10 text-muted hover:text-text-primary backdrop-blur-md transition-all cursor-pointer"
              title={isAutoRotating ? 'Pause Rotation' : 'Resume Auto Rotation'}
            >
              {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-white" />}
            </button>

            <button
              onClick={() => handleZoom('in')}
              className="p-1.5 rounded-full bg-surface/80 hover:bg-surface border border-white/10 text-muted hover:text-text-primary backdrop-blur-md transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleZoom('out')}
              className="p-1.5 rounded-full bg-surface/80 hover:bg-surface border border-white/10 text-muted hover:text-text-primary backdrop-blur-md transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            {onToggleFullScreen && (
              <button
                onClick={onToggleFullScreen}
                className="p-1.5 rounded-full bg-surface/80 hover:bg-surface border border-white/10 text-muted hover:text-text-primary backdrop-blur-md transition-all cursor-pointer"
                title={isFullScreenMode ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullScreenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* WebGL Canvas */}
          <div ref={mountRef} className="w-full h-full cursor-grab" />

          {/* Collapsible Bottom Control Dock */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 max-w-[min(880px,94vw)] w-full flex flex-col items-center pointer-events-none">
            <button
              onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 mb-1.5 rounded-full bg-surface/90 border border-white/10 text-[10px] text-muted hover:text-text-primary transition-all backdrop-blur-md cursor-pointer"
            >
              {isControlsCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              <span>{isControlsCollapsed ? 'Show Controls' : 'Hide Controls'}</span>
            </button>

            {!isControlsCollapsed && (
              <div className="pointer-events-auto w-full p-2 sm:p-2.5 rounded-xl bg-surface/90 backdrop-blur-md border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-2.5 text-xs">
                {/* Camera View Switcher */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-muted uppercase tracking-wider mr-1 hidden sm:inline font-mono">
                    View:
                  </span>
                  {(['orbit', 'isometric', 'top', 'close'] as const).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => applyCameraPreset(preset)}
                      className={`text-xs px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                        activeCamPreset === preset
                          ? 'bg-white/20 text-white border border-white/40 font-medium'
                          : 'bg-bg/80 text-muted hover:text-text-primary hover:bg-surface border border-white/5'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Layer Spacing / Expansion Slider */}
                <div className="flex items-center gap-2">
                  <Sliders className="w-3 h-3 text-white/70" />
                  <span className="text-[10px] text-muted uppercase tracking-wider hidden sm:inline font-mono">
                    Expansion:
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.02"
                    value={layerSpacing}
                    onChange={(e) => setLayerSpacing(parseFloat(e.target.value))}
                    className="w-20 sm:w-24 accent-white cursor-pointer"
                    title="Expand/Separate Layer Rings"
                  />
                  <span className="text-[10px] text-muted font-mono tabular-nums w-7">
                    {Math.round(layerSpacing * 125)}%
                  </span>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsWireframe(!isWireframe)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                      isWireframe
                        ? 'bg-white/20 text-white border-white/40 font-medium'
                        : 'bg-bg/80 text-muted hover:text-text-primary hover:bg-surface border-white/5'
                    }`}
                  >
                    <Boxes className="w-3 h-3" />
                    <span>Lattice</span>
                  </button>

                  <button
                    onClick={() => {
                      setLayerSpacing(0.2);
                      applyCameraPreset('orbit');
                    }}
                    className="p-1.5 rounded-lg bg-bg/80 border border-white/5 text-muted hover:text-text-primary transition-colors cursor-pointer"
                    title="Reset Scene"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
