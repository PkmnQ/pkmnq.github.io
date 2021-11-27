const esch = String.fromCodePoint(0x378);

function seq(ord) {
	off = ord - 0x10000;
	high = Math.floor(off / 0x8000)
	low = off % 0x8000
	return String.fromCodePoint(high+0x7c0) + String.fromCodePoint(low+0x8000)
}

function unseq(pair) {
	high = pair.codePointAt(0) - 0x7c0
	low = pair.codePointAt(1) - 0x8000
	off = (high << 15) + low
	return String.fromCodePoint(off + 0x10000)
}

function encode() {
	entext = document.getElementById("input");
	detext = document.getElementById("output");
	post = entext.value;

	detext.value = "";

	for (chr of [...post]) {
		ord = chr.codePointAt();
		if (ord > 0xffff) {
			detext.value += seq(ord);
		} else if (0x7c0 <= ord && ord <= 0x7df || chr === esch) {
			detext.value += esch + chr;
		} else {
			detext.value += chr;
		}
	}
}

function decode() {
	entext = document.getElementById("input");
	detext = document.getElementById("output");
	post = entext.value;

	detext.value = "";

	prev = "";
	mode = 0;
	for (chr of [...post]) {
		switch (mode) {
			case 1:
				detext.value += chr;
				mode = 0;
				break;
			case 2:
				detext.value += unseq(prev + chr);
				mode = 0;
				break;
			default:
				if (chr === esch) {
					mode = 1;
				} else if (0x7c0 <= chr.codePointAt() && chr.codePointAt() <= 0x7df) {
					mode = 2;
					prev = chr;
				} else {
					detext.value += chr;
				}
				break;
		}
	}
}
