//!native

import { EIGHT_BIT_SIZE, MAX_BUFFER_SIZE, SIXTEEN_BIT_SIZE, THIRTY_TWO_BIT_SIZE } from "./constants";
import { uint16 } from "./data-types";
import { BufferDataType } from "./data-types/types";
import { InferBufferDataType, SharedBufferOperations } from "./types";

/**
 * A wrapper around {@link buffer | buffers} that makes writing to them
 * easy and convenient.
 *
 * The buffer is automatically resized to fit the size requirement of the data being written.
 */
export class BufferWriter implements SharedBufferOperations {
	private buffer: buffer;
	private cursor = 0;
	private size: number;

	public static fromString(str: string) {
		return new BufferWriter(buffer.fromstring(str));
	}

	public static fromSize(size: number) {
		return new BufferWriter(buffer.create(math.max(size, 0)));
	}

	/**
	 * Constructs a {@link BufferWriter} from a {@link BufferDataType | buffer data type}.
	 *
	 * The writer is pre-allocated with the size of the data type, and then the data type
	 * is written to the buffer.
	 *
	 * @example
	 * const writer = BufferWriter.fromBufferDataType(b.uint16, 2048)
	 *
	 * @param dataType The buffer data type
	 * @param value The value of the data type
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static fromBufferDataType<T extends BufferDataType<any>>(dataType: T, value: InferBufferDataType<T>) {
		const writer = BufferWriter.fromSize(dataType.size());
		dataType.write(writer, value);

		return writer;
	}

	constructor(b: buffer) {
		this.buffer = b;
		this.size = buffer.len(b);
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

	public writeUInt8(value: number) {
		this.allocate(EIGHT_BIT_SIZE);

		buffer.writeu8(this.buffer, this.cursor, value);
		this.cursor += EIGHT_BIT_SIZE;
	}

	public writeUInt16(value: number) {
		this.allocate(SIXTEEN_BIT_SIZE);

		buffer.writeu16(this.buffer, this.cursor, value);
		this.cursor += SIXTEEN_BIT_SIZE;
	}

	public writeUInt32(value: number) {
		this.allocate(THIRTY_TWO_BIT_SIZE);

		buffer.writeu32(this.buffer, this.cursor, value);
		this.cursor += THIRTY_TWO_BIT_SIZE;
	}

	public writeInt8(value: number) {
		this.allocate(EIGHT_BIT_SIZE);

		buffer.writei8(this.buffer, this.cursor, value);
		this.cursor += EIGHT_BIT_SIZE;
	}

	public writeInt16(value: number) {
		this.allocate(SIXTEEN_BIT_SIZE);

		buffer.writei16(this.buffer, this.cursor, value);
		this.cursor += SIXTEEN_BIT_SIZE;
	}

	public writeInt32(value: number) {
		this.allocate(THIRTY_TWO_BIT_SIZE);

		buffer.writei32(this.buffer, this.cursor, value);
		this.cursor += THIRTY_TWO_BIT_SIZE;
	}

	public writeFloat32(value: number) {
		this.allocate(THIRTY_TWO_BIT_SIZE);

		buffer.writef32(this.buffer, this.cursor, value);
		this.cursor += THIRTY_TWO_BIT_SIZE;
	}

	public writeFloat64(value: number) {
		this.allocate(EIGHT_BIT_SIZE);

		buffer.writef64(this.buffer, this.cursor, value);
		this.cursor += EIGHT_BIT_SIZE;
	}

	public writeBoolean(value: boolean) {
		this.writeUInt8(value ? 1 : 0);
	}

	public writeString(value: string, length?: number) {
		const len = length !== undefined ? math.min(value.size(), length) : value.size();
		const size = len + SIXTEEN_BIT_SIZE;

		this.allocate(size);

		buffer.writeu16(this.buffer, this.cursor, len);
		buffer.writestring(this.buffer, this.cursor + SIXTEEN_BIT_SIZE, value);

		this.cursor += size;
	}

	public writeBuffer(value: buffer) {
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
