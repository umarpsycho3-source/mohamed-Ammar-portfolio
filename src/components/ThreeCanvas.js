import * as THREE from 'three';

export function initThreeCanvas(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group to contain objects for interactive tilt
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Object 1: Metallic Cyber Wireframe Torus Knot
  const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
  const torusKnotMat = new THREE.MeshPhysicalMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x7000ff,
    emissiveIntensity: 0.4
  });
  const torusKnotMesh = new THREE.Mesh(torusKnotGeo, torusKnotMat);
  mainGroup.add(torusKnotMesh);

  // Object 2: Inner Floating Icosahedron (Glass Core)
  const icoGeo = new THREE.IcosahedronGeometry(0.85, 1);
  const icoMat = new THREE.MeshStandardMaterial({
    color: 0xff007f,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.65
  });
  const icoMesh = new THREE.Mesh(icoGeo, icoMat);
  mainGroup.add(icoMesh);

  // Object 3: Floating Particle Swarm
  const particlesGeo = new THREE.BufferGeometry();
  const particleCount = 200;
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 12;
  }

  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({
    size: 0.035,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.8
  });
  const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particlesMesh);

  // Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00f0ff, 3, 10);
  pointLight1.position.set(3, 3, 3);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff007f, 3, 10);
  pointLight2.position.set(-3, -3, 2);
  scene.add(pointLight2);

  // Mouse Interactivity
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const handleMouseMove = (event) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX = (event.clientX - windowHalfX) * 0.0008;
    mouseY = (event.clientY - windowHalfY) * 0.0008;
  };

  window.addEventListener('mousemove', handleMouseMove);

  // Resize handler
  const handleResize = () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', handleResize);

  // Animation Loop
  let animationFrameId;
  const clock = new THREE.Clock();

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate 3D Objects
    torusKnotMesh.rotation.x = elapsedTime * 0.3;
    torusKnotMesh.rotation.y = elapsedTime * 0.4;

    icoMesh.rotation.x = -elapsedTime * 0.5;
    icoMesh.rotation.y = -elapsedTime * 0.3;

    particlesMesh.rotation.y = elapsedTime * 0.05;

    // Smooth Mouse Ease
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    mainGroup.rotation.y = targetX * 1.5;
    mainGroup.rotation.x = targetY * 1.5;

    renderer.render(scene, camera);
  };

  animate();

  // Cleanup reference
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    if (renderer.domElement && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}
