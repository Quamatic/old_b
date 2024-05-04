import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";

export interface BufferDataType<T> {
	readonly size: (value?: T) => number;
	readonly read: (reader: BufferReader) => T;
	readonly write: (writer: BufferWriter, value: T) => void;
}
