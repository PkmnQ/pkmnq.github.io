function addFrame() {
	const recursiveFrame = document.createElement("iframe")
	recursiveFrame.src = `iframe?r=${btoa(Math.random())}`
	// i only used btoa to make it look professional
	// just using Math.random() probably works fine

	document.body.appendChild(recursiveFrame)
}
