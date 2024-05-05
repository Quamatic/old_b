//!native

import { EIGHT_BIT_SIZE, SIXTEEN_BIT_SIZE, SIXTY_FOUR_BIT_SIZE, THIRTY_TWO_BIT_SIZE } from "./constants";
import { SharedBufferOperations } from "./types";

/**
 * A wrapper around {@link buffer | buffers} that makes reading from them
 * easy and convenient.
 */
export class BufferReader implements SharedBufferOperations {
	private readonly buffer: buffer;
	private size: number;
	private cursor = 0;

	/**
	 * Creates a new {@link BufferReader} from a string.
	 *
	 * @param str The string to use
	 */
	public static fromString(str: string) {
		return new BufferReader(buffer.fromstring(str));
	}

	constructor(buf: buffer) {
		this.buffer = buf;
		this.size = buffer.len(buf);
	}

	private assertSizeBounds(bytesRequired: number) {
		if (this.cursor + bytesRequired > this.size) {
			throw `Cursor went out of bounds (above the buffer size of ${this.size} bytes)`;
		}
	}

	public readUInt8() {
		this.assertSizeBounds(EIGHT_BIT_SIZE);

		const value = buffer.readu8(this.buffer, this.cursor);
		this.cursor += EIGHT_BIT_SIZE;

		return value;
	}

	public readUInt16() {
		this.assertSizeBounds(SIXTEEN_BIT_SIZE);

		const value = buffer.readu16(this.buffer, this.cursor);
		this.cursor += SIXTEEN_BIT_SIZE;

		return value;
	}

	public readUInt32() {
		this.assertSizeBounds(THIRTY_TWO_BIT_SIZE);

		const value = buffer.readu32(this.buffer, this.cursor);
		this.cursor += THIRTY_TWO_BIT_SIZE;

		return value;
	}

	public readInt8() {
		this.assertSizeBounds(EIGHT_BIT_SIZE);

		const value = buffer.readi8(this.buffer, this.cursor);
		this.cursor += EIGHT_BIT_SIZE;

		return value;
	}

	public readInt16() {
		this.assertSizeBounds(SIXTEEN_BIT_SIZE);

		const value = buffer.readi16(this.buffer, this.cursor);
		this.cursor += SIXTEEN_BIT_SIZE;

		return value;
	}

	public readInt32() {
		this.assertSizeBounds(THIRTY_TWO_BIT_SIZE);

		const value = buffer.readi32(this.buffer, this.cursor);
		this.cursor += THIRTY_TWO_BIT_SIZE;

		return value;
	}

	public readFloat32() {
		this.assertSizeBounds(THIRTY_TWO_BIT_SIZE);

		const value = buffer.readf32(this.buffer, this.cursor);
		this.cursor += THIRTY_TWO_BIT_SIZE;

		return value;
	}

	public readFloat64() {
		this.assertSizeBounds(SIXTY_FOUR_BIT_SIZE);

		const value = buffer.readf64(this.buffer, this.cursor);
		this.cursor += SIXTY_FOUR_BIT_SIZE;

		return value;
	}

	public readBoolean() {
		const value = this.readUInt8();
		return value === 1;
	}

	public readString(length?: number) {
		let size: number;

		if (length !== undefined) {
			size = math.max(0, math.floor(length));
		} else {
			size = this.readUInt16(); // Will add to the cursor
		}

		this.assertSizeBounds(size);

		const value = buffer.readstring(this.buffer, this.cursor, size);
		this.cursor = size;

		return value;
	}

	public readBuffer() {
		const length = buffer.readu32(this.buffer, this.cursor);

		this.assertSizeBounds(length);

		const target = buffer.create(length);
		buffer.copy(target, 0, this.buffer, this.cursor + SIXTEEN_BIT_SIZE, length);

		return target;
	}

	public getBuffer(): buffer {
		return this.buffer;
	}

	public getSize(): number {
		return this.size;
	}

	public setCursor(cursor: number): void {
		if (cursor < 0 || cursor > this.size) {
			throw `Attempted to set cursor position of out range ([0, ${this.size}])`;
		}

		this.cursor = cursor;
	}

	public resetCursor(): void {
		this.cursor = 0;
	}

	/**
	 * Checks to see if the reader has reached the end of the buffer
	 *
	 * @example
	 * const reader = BufferReader.fromString(...)
	 * while (!reader.eof()) {
	 * 	const byte = reader.readu8()
	 * 	print("Byte value:", byte)
	 * }
	 *
	 * print("Reached end of buffer")
	 *
	 * @returns `true` if the reader's cursor has reached the size of the buffer
	 */
	public eof() {
		return this.cursor >= this.size;
	}
}
