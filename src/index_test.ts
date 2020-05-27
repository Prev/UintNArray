import UintNArray from './index';

describe('testUintNArray', () => {
	it('testExample', () => {
		const input = [6, 2, 4, 0, 3, 1, 2, 0, 7, 7, 2, 4];	
		const buffer = UintNArray.encode(3, input);
		const decoded = UintNArray.decode(3, buffer);

		expect(decoded).toEqual(input);
	});

	it('test2bit', () => {
		// 2-bit data has a range[0, 3]
		const input = [] as number[];
		for (let i = 0; i < 100; i++) {
			input.push((i * 5) % 4);
		}
		
		const buffer = UintNArray.encode(2, input);
		const decoded = UintNArray.decode(2, buffer);

		expect(decoded).toEqual(input);
	});

	it('test3bit', () => {
		// 3-bit data has a range[0, 7]
		const input = [6, 2, 4, 0, 3, 1, 2, 0, 7, 7, 2, 4];
		
		const buffer = UintNArray.encode(3, input);
		const decoded = UintNArray.decode(3, buffer);

		expect(decoded).toEqual(input);
	});

	it('test4bit', () => {
		// 4-bit data has a range[0, 15]
		const input = [] as number[];
		for (let i = 0; i < 100; i++) {
			input.push((i * 7) % 16);
		}
		
		const buffer = UintNArray.encode(4, input);
		const decoded = UintNArray.decode(4, buffer);

		expect(decoded).toEqual(input);
	});

	it('test5bit', () => {
		// 5-bit data has a range[0, 31]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 32);
		}
		
		const buffer = UintNArray.encode(5, input);
		const decoded = UintNArray.decode(5, buffer);

		expect(decoded).toEqual(input);
	});

	it('test6bit', () => {
		// 6-bit data has a range[0, 63]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 64);
		}
		
		const buffer = UintNArray.encode(6, input);
		const decoded = UintNArray.decode(6, buffer);

		expect(decoded).toEqual(input);
	});

	it('test7bit', () => {
		// 7-bit data has a range[0, 127]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 128);
		}
		
		const buffer = UintNArray.encode(7, input);
		const decoded = UintNArray.decode(7, buffer);

		expect(decoded).toEqual(input);
	});

	it('test8bit', () => {
		// 8-bit data has a range[0, 255]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 256);
		}
		
		const buffer = UintNArray.encode(8, input);
		const decoded = UintNArray.decode(8, buffer);

		expect(decoded).toEqual(input);
	});

	it('test9bit', () => {
		// 9-bit data has a range[0, 511]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 512);
		}
		
		const buffer = UintNArray.encode(9, input);
		const decoded = UintNArray.decode(9, buffer);

		expect(decoded).toEqual(input);
	});

	it('test10bit', () => {
		// 10-bit data has a range[0, 1023]
		const input = [] as number[];
		for (let i = 0; i < 300; i++) {
			input.push((i * 7) % 1024);
		}
		
		const buffer = UintNArray.encode(10, input);
		const decoded = UintNArray.decode(10, buffer);

		expect(decoded).toEqual(input);
	});
});
