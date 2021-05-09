function main() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	window.addEventListener("resize", onWindowResize, false);
	guiSetup();

	const particles = [];

	for (let i = 0; i < 3000; i++) {
		let radius = getRandomVal(0, 300);
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

function intensityBulge(r, i, k) {
	return i * Math.exp(-k * Math.pow(r, 0.25));
}

function intensityDisc(r, i, a) {
	return i * Math.exp(-r / a);
}

function intensity(x, bulge, i, k, a) {
	return x < bulge ? intensityBulge(x, i, k) : intensityDisc(x - bulge, intensityBulge(bulge, i, k), a);
}
