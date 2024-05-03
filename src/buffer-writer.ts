//!native

import { EIGHT_BIT_SIZE, MAX_BUFFER_SIZE, SIXTEEN_BIT_SIZE, THIRTY_TWO_BIT_SIZE } from "./constants";
import { SharedBufferOperations } from "./types";

/**
 * A wrapper around {@link buffer | buffers} that makes writing to them
 * easy and convenient.
 *
 * The buffer being written to is automatically resized to fit the size requirement
 * of the data being written.
 *
 * Only contains the same method that {@link buffer | buffers} do, for consistency.
 */
export class BufferWriter implements SharedBufferOperations {
	private buffer: buffer;
	private cursor = 0;
	private size: number;

	public static fromBuffer(buffer: buffer) {}

	/**
	 * @param initialSize The initial size of the buffer. Defaults to 0.
	 */
	constructor(initialSize: number = 0) {
		this.buffer = buffer.create(initialSize);
		this.size = initialSize;
	}

	/**
	 * Attempts to allocate a given amount of bytes to the internal buffer.
	 */
	public allocate(bytes: number) {
		const newBufferSize = this.size + bytes;
		if (newBufferSize > MAX_BUFFER_SIZE) {
			throw `Cannot resize buffer to ${bytes} bytes due to overflowing the maximum of ${MAX_BUFFER_SIZE} bytes`;
		}

		if (newBufferSize < buffer.len(this.buffer)) {
			return;
		}

		const newBuffer = buffer.create(newBufferSize);
		buffer.copy(this.buffer, 0, newBuffer, 0);

		this.buffer = newBuffer;
		this.size = newBufferSize;
	}

	public writeu8(value: number) {
		this.allocate(EIGHT_BIT_SIZE);

		buffer.writeu8(this.buffer, this.cursor, value);
		this.cursor += EIGHT_BIT_SIZE;
	}

	public writeu16(value: number) {
		this.allocate(SIXTEEN_BIT_SIZE);

		buffer.writeu16(this.buffer, this.cursor, value);
		this.cursor += SIXTEEN_BIT_SIZE;
	}

	public writeu32(value: number) {
		this.allocate(THIRTY_TWO_BIT_SIZE);

		buffer.writeu32(this.buffer, this.cursor, value);
		this.cursor += THIRTY_TWO_BIT_SIZE;
	}

	public writei8(value: number) {
		this.allocate(EIGHT_BIT_SIZE);

		buffer.writei8(this.buffer, this.cursor, value);
		this.cursor += EIGHT_BIT_SIZE;
	}

	public writei16(value: number) {
		this.allocate(SIXTEEN_BIT_SIZE);

		buffer.writei16(this.buffer, this.cursor, value);
		this.cursor += SIXTEEN_BIT_SIZE;
	}

	public writei32(value: number) {
		this.allocate(THIRTY_TWO_BIT_SIZE);

		buffer.writei32(this.buffer, this.cursor, value);
		this.cursor += THIRTY_TWO_BIT_SIZE;
	}

	public writef32(value: number) {
		this.allocate(THIRTY_TWO_BIT_SIZE);

		buffer.writef32(this.buffer, this.cursor, value);
		this.cursor += THIRTY_TWO_BIT_SIZE;
	}

	public writef64(value: number) {
		this.allocate(EIGHT_BIT_SIZE);

		buffer.writef64(this.buffer, this.cursor, value);
		this.cursor += EIGHT_BIT_SIZE;
	}

	public writeboolean(value: boolean) {
		this.writeu8(value ? 1 : 0);
	}

	public writestring(value: string, length?: number) {
		const len = length !== undefined ? math.min(value.size(), length) : value.size();
		const size = len + SIXTEEN_BIT_SIZE;

		this.allocate(size);

		buffer.writeu16(this.buffer, this.cursor, len);
		buffer.writestring(this.buffer, this.cursor + SIXTEEN_BIT_SIZE, value);

		this.cursor += size;
	}

	public writecopy(value: buffer) {
		const length = buffer.len(value);

		this.allocate(length);
		buffer.copy(value, 0, this.buffer, this.cursor);

		this.cursor += length;
	}

	public getSize() {
		return this.size;
	}

	public getBuffer() {
		return this.buffer;
	}

	public setCursor(cursor: number) {
		if (cursor < 0 || cursor > this.size) {
			throw `Attempted to set cursor position of out range ([0, ${this.size}])`;
		}

		this.cursor = cursor;
	}

	public resetCursor() {
		this.cursor = 0;
	}

	public toString() {
		return buffer.tostring(this.buffer);
	}
}
