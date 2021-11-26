const esch = String.fromCodePoint(0x378);

function seq(ord) {
	off = ord - 0x10000;
	high = Math.floor(off / 0x8000)
	low = off % 0x8000
	return String.fromCodePoint(high+0x7c0) + String.fromCodePoint(low+0x8000)
}

function encode() {
	entext = document.getElementById("input");
	detext = document.getElementById("output");
	post = entext.value;

	detext.value = "";

	for (let i = 0; i < post.length; i++) {
		ord = post.codePointAt(i);
		chr = String.fromCodePoint(ord);
		if (ord > 0xffff) {
			detext.value += seq(ord);
		} else if (0x7c0 <= ord && ord <= 0x7e0 || chr == esch) {
			detext.value += esch + chr;
		} else {
			detext.value += chr;
		}
	}
}
