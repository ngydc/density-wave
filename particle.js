class Particle extends THREE.Mesh {
	constructor(radius, b, angle, ellipseOffset) {
		const geometry = new THREE.SphereGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
		super(geometry, material);
		this.ellipseOffset = ellipseOffset;
		this.angle = angle;
		this.radius = radius;
		this.b = b;
	}

	update() {
		let x = this.radius * Math.cos(this.angle);
		let y = this.b * Math.sin(this.angle);
		const cos = Math.cos(controls.ellipseOffset / this.radius);
		const sin = Math.sin(controls.ellipseOffset / this.radius);
		const tx = x - 0;
		const ty = y - 0;
		// Rotate the point about the center of the ellipse.
		x = tx * cos - ty * sin;
		y = tx * sin + ty * cos;

		this.position.set(x, y, 0);
		this.calculateColor();
		//this.angle += this.computeVelocity();
		this.angle += controls.animationSpeed * this.computeVelocity();
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
