function main() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	window.addEventListener("resize", onWindowResize, false);

	for (let i = 1; i < 11; i++) {
		const curve = new THREE.EllipseCurve(
			0,
			0, // ax, aY
			15 * i,
			20 * i, // xRadius, yRadius
			0,
			2 * Math.PI, // aStartAngle, aEndAngle
			false, // aClockwise
			2 * Math.PI - i * 3.4 // aRotation
		);
		const points = curve.getPoints(50);
		const geometry = new THREE.BufferGeometry().setFromPoints(points);

		const material = new THREE.LineBasicMaterial({ color: 0xffffff });

		// Create the final object to add to the scene
		const ellipse = new THREE.Line(geometry, material);

		scene.add(ellipse);
	}

	camera.position.z = 300;

	renderer.render(scene, camera);

	// function animate() {
	// 	requestAnimationFrame(animate);
	// 	renderer.render(scene, camera);
	// }
	// animate();

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
