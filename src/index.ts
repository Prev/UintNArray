/**
 * UintArray with variable size.
 * Native JavaScript UintArray only supports 8, 16, or 32 bit sizes (Uint8Array, Uint16Array, and Uint32Array respetively).
 * UintNArray extends them, by supporting variable size of the bit from 1 to 32.
 */
export default class UintNArray {

	// Create ArrayBuffer from dataArray
	public static encode(bitSize: number, dataArray: number[]): ArrayBuffer {
		
		const containerSize = UintNArray.getContainerSize(bitSize);
		const containerNum = Math.ceil(bitSize * dataArray.length / containerSize);
		const garbageLength = (containerSize * containerNum) - (bitSize * dataArray.length);
		
		// Note that ArrayBuffer takes "byte length", while containerSize indicates "bit size".
		// So the "byte length" of the array buffer should be "containerSize * containerNum / 8".
		// In the meanwhile, we have to record the information that where is the end of the byte stream.
		// As length of the dataArray is variable (i.e., recording the length cannot be done within fixed size),
		// we record "garbage length" instead.
		// Use use first container to record the garbage length, so the final byte length of the buffer is
		// "containerSize * (containerNum + 1) / 8".
		const buffer = new ArrayBuffer(containerSize * (containerNum + 1) / 8);

		// Note: View contents are initialized to 0 when using native ArrayViews.
		const view = UintNArray.getViewFromContainerSize(containerSize, buffer);

		// Record the garbage length into the first byte
		view[0] = garbageLength;

		// View index starts from 1 since first byte is used as the garbage length
		let viewIndex = 1;
		let offset = 0;
		for (let i = 0; i < dataArray.length; i++) {
			offset += bitSize;
			
			// When recording the dataArray[i] into the container(dataview), there are two cases:
			// 1) container has enough capacity to recording data (offset <= containerSize)
			// 2) container has not enough capacity to record data (offset > containerSize)
			if (offset <= containerSize) {
				// In the first case, simply write the data into the container
				view[viewIndex] |= dataArray[i] << (containerSize - offset);

			} else {
				// In the second case, divide data and write into two containers
				view[viewIndex] |= dataArray[i] >>> (offset - containerSize);
				view[viewIndex+1] |= dataArray[i] << (2*containerSize - offset);
			}

			if (offset >= containerSize) {
				offset -= containerSize;
				viewIndex++;
			}
		}
		return buffer;
	}

	// Decode ArrayBuffer to arrayList
	public static decode(bitSize: number, buffer: ArrayBuffer): number[] {
		const containerSize = UintNArray.getContainerSize(bitSize);
		
		// Init view to load data from the buffer
		const view = UintNArray.getViewFromContainerSize(containerSize, buffer);
		const garbageLength = view[0];

		// Infer dataLength from the byte length of the buffer and the garbage length.
		const dataLength = (buffer.byteLength * 8 - containerSize - garbageLength) / bitSize;

		// The number is used to generate bit-mask.
		const magicNumber = Math.pow(2, bitSize) - 1;
		
		let viewIndex = 1;
		let offset = 0;
		let shift: number;
		let mask: number;

		const dataArray: number[] = new Array(dataLength);
		for (let i = 0; i < dataArray.length; i++) {
			offset += bitSize;

			// Similar with creating process, we have to divide decoding process into two cases.
			if (offset <= containerSize) {
				// 1) Data is recorded in the single container.
				// In this case, we simply use the bit-mask to extract data.
				shift = containerSize - offset;
				mask = magicNumber << shift;
				dataArray[i] = (view[viewIndex] & mask) >>> shift;

			} else {
				// 2) Data is recorded over two containers.
				// In this case, we also use the bit-mask, but repeat the process twice.
				shift = offset - containerSize;
				mask = magicNumber >>> shift;
				dataArray[i] = (view[viewIndex] & mask) << shift;
				
				// Note that we use bit-or operator (|=) on the second process.
				shift = 2*containerSize - offset
				mask = magicNumber << shift;
				dataArray[i] |= (view[viewIndex+1] & mask) >>> shift;
			}

			if (offset >= containerSize) {
				offset -= containerSize;
				viewIndex++;
			}
		}

		return dataArray;
	}
	
	// There are three containers supported in JavaScript: 8-bit, 16-bit, 32-bit.
	// If the bitSize is 8, 16, or 32, we can use naive Uint8Array, Unit16Array, and Unit32Array respectively.
	// But for the other values, we use more than double sized containers (e.g., use 16-bit container for 7-bit data)
	// for the size efficiency.
	private static getContainerSize(bitSize: number): number {
		if (bitSize <= 4 || bitSize == 8) {
			// use 8-bit container
			return 8;

		} else if (bitSize < 8 || bitSize == 16) {
			// use 16-bit container
			return 16;

		} else {
			// use 32-bit container
			return 32;
		}
	}

	private static getViewFromContainerSize(containerSize: number, buffer: ArrayBuffer): Uint8Array | Uint16Array | Uint32Array {
		if (containerSize == 8)
			return new Uint8Array(buffer);
		else if (containerSize == 16)
			return new Uint16Array(buffer);
		else if (containerSize == 32)
			return new Uint32Array(buffer);
		else {
			throw new Error(`Unsupported containerSize '${containerSize}'.`);
		}
	}
}
