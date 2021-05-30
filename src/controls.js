import { GUI } from "../lib/dat.gui.module.js";

export default class ControlsUI {
	constructor(galaxy) {
		const gui = new GUI({ width: 350 });
		gui.add(galaxy, "animationSpeed", 0, 3).name("Animation Speed");
		gui.add(galaxy.geometry, "instanceCount", 0, galaxy.starCount).name("Amount of Stars");
		gui.add(galaxy.material.uniforms["ellipseOffset"], "value", 0, 1000).name("Ellipse Offset");
		gui.add(galaxy.material.uniforms["axisRatio"], "value", 0, 1).name("Ellipse Axis Ratio");
	}
}
