import * as THREE from "../lib/three.module.js";
import Particle from "./particle.js";
import * as Controls from "./controls.js";

function main() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	window.addEventListener("resize", onWindowResize, false);
	Controls.guiSetup();

	const particles = [];

	for (let i = 0; i < 3000; i++) {
		// arbitrary function modelling the distribution of stars (more stars to the core)
		let radius = Math.abs(1000 * Math.pow(Math.random() - 0.5, 2));
		let angle = getRandomVal(0, 360);
		let ellipseOffset = 300 / radius;
		let particle = new Particle(radius, radius / 1.2, angle, ellipseOffset);
		particles.push(particle);
		scene.add(particle);
	}

	camera.position.z = 400;

	renderer.render(scene, camera);

	function animate() {
		requestAnimationFrame(animate);
		for (let particle of particles) {
			particle.update();
		}

		renderer.render(scene, camera);
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

function getRandomVal(min, max) {
	return Math.random() * (max - min + 1) + min;
}
