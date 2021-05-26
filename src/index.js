import * as THREE from "../lib/three.module.js";
import Galaxy from "./galaxy.js";
import ControlsUI from "./controls.js";
import Stats from "../lib/stats.module.js";

function main() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	window.addEventListener("resize", onWindowResize, false);

	camera.position.z = 400;

	const galaxy = new Galaxy(20000, 200, 50, 0);
	const gui = new ControlsUI(galaxy);
	scene.add(galaxy);
	renderer.render(scene, camera);

	const stats = new Stats();
	document.body.appendChild(stats.dom);

	function animate() {
		requestAnimationFrame(animate);
		galaxy.updateStars();
		renderer.render(scene, camera);
		stats.update();
	}
	animate();

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}
}

main();
