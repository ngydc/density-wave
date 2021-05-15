import * as THREE from "../lib/three.module.js";
import * as Controls from "./controls.js";

export default class Particle extends THREE.Mesh {
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
		const cos = Math.cos(Controls.data.ellipseOffset / this.radius);
		const sin = Math.sin(Controls.data.ellipseOffset / this.radius);
		const tx = x - 0;
		const ty = y - 0;
		// Rotate the point about the center of the ellipse.
		x = tx * cos - ty * sin;
		y = tx * sin + ty * cos;

		this.position.set(x, y, 0);
		this.calculateColor();
		this.angle += Controls.data.animationSpeed * this.computeVelocity();
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

function intensity(x, bulge, i, k, a) {
	return x < bulge ? intensityBulge(x, i, k) : intensityDisc(x - bulge, intensityBulge(bulge, i, k), a);
}

function intensityBulge(r, i, k) {
	return i * Math.exp(-k * Math.pow(r, 0.25));
}

function intensityDisc(r, i, a) {
	return i * Math.exp(-r / a);
}
