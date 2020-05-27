import VArrayBuffer from './index';

describe('testVArrayBuffer', () => {
	it('testExample', () => {
		const input = [6, 2, 4, 0, 3, 1, 2, 0, 7, 7, 2, 4];	
		const bufferView = VArrayBuffer.from(3, input);

		const bufferViewForDecoding = new VArrayBuffer(3, bufferView.buffer);
		const decoded = bufferViewForDecoding.decode();

		expect(decoded).toEqual(input);
	});

	it('test2bit', () => {
		// 2-bit data has a range[0, 3]
		const input = [] as number[];
		for (let i = 0; i < 100; i++) {
			input.push((i * 5) % 4);
		}
		
		const vab = VArrayBuffer.from(2, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test3bit', () => {
		// 3-bit data has a range[0, 7]
		const input = [6, 2, 4, 0, 3, 1, 2, 0, 7, 7, 2, 4];
		
		const vab = VArrayBuffer.from(3, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test4bit', () => {
		// 4-bit data has a range[0, 15]
		const input = [] as number[];
		for (let i = 0; i < 100; i++) {
			input.push((i * 7) % 16);
		}
		
		const vab = VArrayBuffer.from(4, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test5bit', () => {
		// 5-bit data has a range[0, 31]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 32);
		}
		
		const vab = VArrayBuffer.from(5, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test6bit', () => {
		// 6-bit data has a range[0, 63]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 64);
		}
		
		const vab = VArrayBuffer.from(6, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test7bit', () => {
		// 7-bit data has a range[0, 127]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 128);
		}
		
		const vab = VArrayBuffer.from(7, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test8bit', () => {
		// 8-bit data has a range[0, 255]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 256);
		}
		
		const vab = VArrayBuffer.from(8, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test9bit', () => {
		// 9-bit data has a range[0, 511]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 512);
		}
		
		const vab = VArrayBuffer.from(9, input);
		expect(vab.decode()).toEqual(input);
	});

	it('test10bit', () => {
		// 10-bit data has a range[0, 1023]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 1024);
		}
		
		const vab = VArrayBuffer.from(10, input);
		expect(vab.decode()).toEqual(input);
	});
});
