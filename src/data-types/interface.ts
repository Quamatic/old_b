import { BufferDataType } from "./types";

type ExtractedBufferValue<T extends Interface, K extends keyof T> = T[K] extends BufferDataType<infer V> ? V : never;

export type ExtractedBufferValues<T extends Interface> = {
	[K in keyof T]: ExtractedBufferValue<T, K>;
};

export type Interface = Record<string, BufferDataType<unknown>>;

/**
 * Creates a type that mimics an interface.
 * @returns
 */
function _interface<const T extends Interface, P extends boolean = false>(
	struct: T,
): BufferDataType<ExtractedBufferValues<T>> {
	const indexToDataType: Record<number, T[keyof T]> = {};
	const indexToKey: Record<number, keyof T> = {};
	let count = 0;

	for (const [key] of pairs(struct)) {
		count++;

		indexToDataType[count] = struct[key as keyof T];
		indexToKey[count] = key as keyof T;
	}

	return {
		size: () => 0,

		read: (reader) => {
			const constructed = {} as ExtractedBufferValues<T>;

			for (const [index, type] of pairs(indexToDataType)) {
				const key = indexToKey[index];
				const value = type.read(reader) as ExtractedBufferValue<T, typeof key>;

				constructed[key] = value;
			}

			return constructed;
		},

		write: (writer, value) => {
			for (const [index, type] of pairs(indexToDataType)) {
				type.write(writer, value[indexToKey[index]]);
			}
		},
	};
}

// Just a way to get around the compiler
export { _interface as interface };