import './style.css';

import snowflake1Url from './assets/snowflakes/Snowflake1.jpg?url';
import snowflake2Url from './assets/snowflakes/Snowflake2.jpg?url';
import snowflake3Url from './assets/snowflakes/Snowflake3.jpg?url';
import snowflake4Url from './assets/snowflakes/Snowflake4.jpg?url';
import snowflake5Url from './assets/snowflakes/Snowflake5.jpg?url';
import snowflake6Url from './assets/snowflakes/Snowflake6.jpg?url';
import snowflake7Url from './assets/snowflakes/Snowflake7.jpg?url';
import snowflake9Url from './assets/snowflakes/Snowflake9.jpg?url';
import snowflake10Url from './assets/snowflakes/Snowflake10.jpg?url';
import snowflake11Url from './assets/snowflakes/Snowflake11.jpg?url';



import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


let camera, scene, renderer, controls, parameters;
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const materials = [];

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0008);

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const textureLoader = new THREE.TextureLoader();

  const sprite1 = textureLoader.load(snowflake1Url);
  const sprite2 = textureLoader.load(snowflake2Url);
  const sprite3 = textureLoader.load(snowflake3Url);
  const sprite4 = textureLoader.load(snowflake4Url);
  const sprite5 = textureLoader.load(snowflake5Url);
  const sprite6 = textureLoader.load(snowflake6Url);
  const sprite7 = textureLoader.load(snowflake7Url);
  const sprite9 = textureLoader.load(snowflake9Url);
  const sprite10 = textureLoader.load(snowflake10Url);
  const sprite11 = textureLoader.load(snowflake11Url);

  for (let i = 0; i < 5000; i++) {

    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;

    vertices.push(x, y, z);

  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  parameters = [
    [[1.0, 0.2, 0.5], sprite2, 20],
    [[0.95, 0.1, 0.5], sprite3, 15],
    [[0.90, 0.05, 0.5], sprite1, 10],
    [[0.85, 0, 0.5], sprite5, 8],
    [[0.80, 0, 0.5], sprite4, 5],
    [[1.0, 0.2, 0.5], sprite6, 20],
    [[0.95, 0.1, 0.5], sprite7, 15],
    [[0.85, 0, 0.5], sprite9, 8],
    [[0.80, 0, 0.5], sprite10, 5],
    [[0.80, 0, 0.5], sprite11, 5]
  ];

  for (let i = 0; i < parameters.length; i++) {

    const color = parameters[i][0];
    const sprite = parameters[i][1];
    // const size = parameters[i][2];
    const size = Math.random() * 20 + 5;

    materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true });
    materials[i].color.setHSL(color[0], color[1], color[2]);

    const particles = new THREE.Points(geometry, materials[i]);

    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;

    scene.add(particles);

  }

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //

  controls = new OrbitControls(camera, renderer.domElement);
  // controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();

  //

  document.body.style.touchAction = 'none';
  document.body.addEventListener('pointermove', onPointerMove);

  //

  window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event) {

  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

//

function animate() {

  requestAnimationFrame(animate);

  render();

}

function render() {

  const time = Date.now() * 0.00005;

  // camera.position.x += (mouseX - camera.position.x) * 0.05;
  // camera.position.y += (- mouseY - camera.position.y) * 0.05;

  // camera.lookAt(scene.position);

  for (let i = 0; i < scene.children.length; i++) {

    const object = scene.children[i];

    if (object instanceof THREE.Points) {

      object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));

    }

  }

  for (let i = 0; i < materials.length; i++) {

    const color = parameters[i][0];

    const h = (360 * (color[0] + time) % 360) / 360;
    materials[i].color.setHSL(h, color[1], color[2]);

  }

  renderer.render(scene, camera);

}