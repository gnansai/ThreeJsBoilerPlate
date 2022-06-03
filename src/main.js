import {
  AmbientLight,
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";

//GET HTML CONTAINER
const container = document.querySelector("#scene-container");

//CREATE NEW THREE JS SCENE
const scene = new Scene();

//CREATE 3D CAMERA
const camera = new PerspectiveCamera(
  35,
  container.clientWidth / container.clientHeight,
  0.1,
  100
);

camera.position.set(0, 0, 10);

//CREATE A GEOMETRY
const geometry = new BoxBufferGeometry(2, 2, 2);
const material = new MeshPhysicalMaterial();
material.color = new Color(0xffaaff);
const mesh = new Mesh(geometry, material);

//CREATE A LIGHT
const pointLight = new PointLight(0xffffff, 1);
const ambientLight = new AmbientLight(0xffffff, 1);
pointLight.position.y = 10;
pointLight.position.x = 10;

//ADD MESH/LIGHTS TO SCENE
scene.add(mesh, pointLight, ambientLight);

//SETUP RENDERER to RENDER THE SCENE
const renderer = new WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

renderer.physicallyCorrectLights = true;

//ADDS ORBIT CONTROLS TO SCENE
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

//ATTACH RENDERER TO CONTAINER
container.append(renderer.domElement);

//RENDERS 60FRAMES PER SECOND, Requires to work Orbit Controls and any animations
renderer.setAnimationLoop(function () {
  renderer.render(scene, camera);
  mesh.rotation.y += 0.01;
});
