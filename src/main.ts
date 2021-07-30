import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') as HTMLCanvasElement
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star); 
}

Array(200).fill(0).forEach(addStar);

// -- Avatar --

const mylesTexture = new THREE.TextureLoader().load('anime.png');

const myles = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: mylesTexture }),
);

scene.add(myles);

// -- Moon --

const moonTexture = new THREE.TextureLoader().load('jobsdone.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({ map: moonTexture }),
);

moon.position.set(-10, -10, -10);

scene.add(moon);

// -- Renderloop --

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  requestAnimationFrame(animate);
}

let startTimeStamp: number
let previousTimeStamp: number;

let elapsed: number;
let dt: number;

function init(timestamp: number) {
  startTimeStamp = timestamp;
  previousTimeStamp = timestamp;

  elapsed = timestamp - startTimeStamp;
  elapsed /= 1000;

  dt = timestamp - previousTimeStamp;
  dt /= 1000;

  requestAnimationFrame(animate);
}

function animate(timestamp: number) {
  requestAnimationFrame(animate);

  elapsed = timestamp - startTimeStamp;
  elapsed /= 1000;

  dt = timestamp - previousTimeStamp;
  dt /= 1000;

  update();

  render();

  previousTimeStamp = timestamp;
}

function update() {
  torus.rotation.x += 0.1 * dt;
  torus.rotation.y += 0.5 * dt;
  torus.rotation.z += 0.1 * dt;

  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

requestAnimationFrame(init);