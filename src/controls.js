import * as dat from "../lib/dat.gui.module.js";

export const data = new (function () {
	this.animationSpeed = 0.01;
	this.ellipseOffset = 600;
})();

export function guiSetup() {
	let gui = new dat.GUI();
	gui.add(data, "animationSpeed", 0, 0.1);
	gui.add(data, "ellipseOffset", 0, 2000);
}
