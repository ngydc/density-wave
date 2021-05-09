class Particle extends THREE.Mesh {
	constructor(radius, b, angle, ellipseOffset) {
		const geometry = new THREE.SphereGeometry(1, 32, 32);
		const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
		super(geometry, material);
		this.ellipseOffset = ellipseOffset;
		this.angle = angle;
		this.radius = radius;
		this.b = b;
	}

	update() {
		// rotated ellipse:
		// x = x_0 + (r * cos(theta)) * u
		// y = y_0 + (r * sin(theta)) * v
		// let uVec = new THREE.Vector3(
		// 	Math.cos(THREE.MathUtils.degToRad(this.ellipseOffset)),
		// 	Math.sin(THREE.MathUtils.degToRad(this.ellipseOffset)),
		// 	0
		// );
		// let vVec = new THREE.Vector3(
		// 	-Math.sin(THREE.MathUtils.degToRad(this.ellipseOffset)),
		// 	Math.cos(THREE.MathUtils.degToRad(this.ellipseOffset)),
		// 	0
		// );

		// uVec.multiplyScalar(this.radius * Math.cos(THREE.MathUtils.degToRad(this.angle)));
		// vVec.multiplyScalar(this.b * Math.sin(THREE.MathUtils.degToRad(this.angle)));

		// let tmp = new THREE.Vector3(0, 0, 0);
		// tmp.addVectors(uVec, vVec);
		//this.calculateColor();

		let x = this.radius * Math.cos(this.angle);
		let y = this.b * Math.sin(this.angle);
		const cos = Math.cos(this.ellipseOffset);
		const sin = Math.sin(this.ellipseOffset);
		const tx = x - 0;
		const ty = y - 0;
		// Rotate the point about the center of the ellipse.
		x = tx * cos - ty * sin;
		y = tx * sin + ty * cos;

		this.position.set(x, y, 0);
		this.calculateColor();
		//this.angle += this.computeVelocity();
		this.angle += 0.01 * this.computeVelocity();
		this.angle = this.angle % 360;
	}

	calculateColor() {
		let d = Math.abs(this.position.distanceTo(new THREE.Vector3(0, 0, 0)));
		let col = intensity(d, 50, 1.0, 0.05, 300 / 3);
		this.material.color.setScalar(col);
	}

	computeVelocity() {
		let d = Math.abs(this.position.distanceTo(new THREE.Vector3(0, 0, 0)));
		return Math.sqrt(9.8 * (2 / d - 1 / this.radius));
	}
}
