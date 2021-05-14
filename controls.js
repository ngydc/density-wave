const controls = new (function () {
	this.animationSpeed = 0.01;
	this.ellipseOffset = 600;
})();

function guiSetup() {
	let gui = new dat.GUI();
	gui.add(controls, "animationSpeed", 0, 0.1);
	gui.add(controls, "ellipseOffset", 0, 2000);
}
