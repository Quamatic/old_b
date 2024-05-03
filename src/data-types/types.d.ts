import type { BufferReader } from "../buffer-reader";
import type { BufferWriter } from "../buffer-writer";

export interface BufferDataType<T> {
	size: () => number;
	read: (reader: BufferReader) => T;
	write: (writer: BufferWriter, value: T) => void;
}

export type Integer = number & {
	readonly __nominal__Integer: unique symbol;
};

export type Float = number & {
	readonly __nominal__Float: unique symbol;
};
