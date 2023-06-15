// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Create the terrain
const terrainGeometry = new THREE.PlaneGeometry(20, 10, 10, 10);
const terrainLayerGeometry = new THREE.PlaneGeometry(23, 12, 10, 10);
const terrainMaterialRadiating = new THREE.MeshBasicMaterial({ emissive: 0xF9FBE7, color: 0xfffeff });
const terrainMaterial = new THREE.MeshPhongMaterial({color: 0xECCDB4}) 
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
const radiating_terrain  = new THREE.Mesh(terrainLayerGeometry, terrainMaterialRadiating);
terrain.receiveShadow = true;
radiating_terrain.position.set(0 , 0.5, -1)
scene.add(radiating_terrain);
scene.add(terrain);

// Create the paddles
const paddleGeometry = new THREE.BoxGeometry(0.2, 2, 1);
const paddleMaterial = new THREE.MeshPhongMaterial({ color: 0xca7df9 });
const paddle1 = new THREE.Mesh(paddleGeometry, paddleMaterial);
const paddle2 = new THREE.Mesh(paddleGeometry, paddleMaterial);
paddle1.position.set(-8, 0, 0);
paddle2.position.set(8, 0, 0);
paddle1.castShadow = true;
paddle2.castShadow = true;
scene.add(paddle1);
scene.add(paddle2);

// Create the ball
const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xFEA1A1 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 0, 0);
ball.castShadow = true;
scene.add(ball);

// Position and orient the camera
camera.position.set(0, -5, 10); // Adjust the camera position
camera.rotation.x = Math.PI / 6; // Rotate the camera to face the terrain

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const terrainLight = new THREE.AmbientLight(0xffff00, 1);
//terrain.add(terrainLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(2, 2, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Adjust the aspect ratio of the camera to fit the screen
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Update game logic here
  
  renderer.render(scene, camera);
}
animate();
