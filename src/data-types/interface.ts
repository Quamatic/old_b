import { BufferDataType } from "./types";

type ExtractedBufferValue<T extends Interface, K extends keyof T> = T[K] extends BufferDataType<infer V> ? V : never;

type ExtractedBufferValues<T extends Interface, P extends boolean> = {
	[K in keyof T]: ExtractedBufferValue<T, K>;
};

type Interface = Record<string, BufferDataType<unknown>>;

/**
 * Creates a buffer data type that represents a key-value structure (or interface).
 *
 * @param struct The interface definition representing the structured data.
 *
 * @template T The interface type representing the structured data.
 * @template P A boolean type representing whether the data is partial or not. Defaults to `false`.
 */
function _interface<const T extends Interface, P extends boolean = false>(
	struct: T,
): BufferDataType<ExtractedBufferValues<T, P>> {
	const indexToDataType: Record<number, T[keyof T]> = {};
	const indexToKey: Record<number, keyof T> = {};

	// Create identifiers
	let count = 0;
	for (const [key] of pairs(struct)) {
		count++;

		indexToDataType[count] = struct[key as keyof T];
		indexToKey[count] = key as keyof T;
	}

	return {
		size: () => {
			return 0;
		},

		read: (reader) => {
			const constructed = {} as ExtractedBufferValues<T, P>;

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
