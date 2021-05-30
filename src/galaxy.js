import * as THREE from "../lib/three.module.js";

const fShader = `
precision highp float;
varying float col;

void main() {
	gl_FragColor = vec4(col);
}
`;

const vShader = `
#define TWO_PI 6.2831853076
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float time;
uniform float axisRatio;
uniform float ellipseOffset;

attribute vec3 position;
attribute vec2 trajectoryData;

varying float col;

// color calculations
float intensityBulge(float r, float i, float k) {
	return i * exp(-k * pow(r, 0.25));
}

float intensityDisc(float r, float i, float a) {
	return i * exp(-r / a);
}

float intensity(float x, float bulge, float i, float k, float a) {
	return x < bulge ? intensityBulge(x, i, k) : intensityDisc(x - bulge, intensityBulge(bulge, i, k), a);
}

vec3 calcEllipsePos() {
	float angle = trajectoryData.y + time;
	angle = mod(angle,TWO_PI);
	float x = trajectoryData.x * cos(angle);
	float y = trajectoryData.x * axisRatio * sin(angle);
	float cos = cos(ellipseOffset / trajectoryData.x);
	float sin = sin(ellipseOffset / trajectoryData.x);
	float tx = x;
	float ty = y;

	x = tx * cos - ty * sin;
	y = tx * sin + ty * cos;

	return vec3(x,y,0.);
}

void main() {
	vec3 newPos = calcEllipsePos();
	vec4 mvPosition = modelViewMatrix * vec4( newPos, 1.0 );
	mvPosition.xyz += position ;
	float d = sqrt(newPos.x*newPos.x + newPos.y*newPos.y);
	col = intensity(d, 50., 1.0, 0.05, 300. / 3.);
	gl_Position = projectionMatrix * mvPosition;
}
`;

export default class Galaxy extends THREE.Mesh {
	//TODO: include radius, coreRadius and ellipseOffset
	constructor(starCount, radius, coreRadius, ellipseOffset) {
		super();

		const sphereGeometry = new THREE.SphereGeometry(0.5);
		const attrTrajectory = new Float32Array(starCount * 3);

		// fill necessary components of trajectory into the array
		for (let i = 0; i < starCount; i++) {
			let r = Math.abs(1000 * Math.pow(Math.random() - 0.5, 2));
			let angle = getRandomVal(0, Math.PI * 2);
			attrTrajectory[i * 3] = r;
			attrTrajectory[i * 3 + 1] = angle;
		}

		const geometry = new THREE.InstancedBufferGeometry();
		geometry.index = sphereGeometry.index;
		geometry.attributes = sphereGeometry.attributes;
		geometry.instanceCount = starCount;
		geometry.setAttribute("trajectoryData", new THREE.InstancedBufferAttribute(attrTrajectory, 2));

		const material = new THREE.RawShaderMaterial({
			uniforms: {
				time: { value: 0.0 },
				ellipseOffset: { value: 600.0 },
				axisRatio: { value: 0.85 },
			},
			vertexShader: vShader,
			fragmentShader: fShader,
			depthTest: true,
			depthWrite: true,
		});

		this.geometry = geometry;
		this.material = material;
		this.starCount = starCount;
		this.animationSpeed = 1;
	}

	updateStars() {
		this.material.uniforms["time"].value += 0.01 * this.animationSpeed;
	}
}

function getRandomVal(min, max) {
	return Math.random() * (max - min + 1) + min;
}
