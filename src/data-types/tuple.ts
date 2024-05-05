import { InferBufferValuesFromObject } from "../types";
import { BufferDataType } from "./types";

/**
 * Creates a buffer data type representing a tuple of other buffer data types.
 *
 * @example
 * const value = b.tuple(b.uint8, b.uint16, b.array(b.string))
 *
 * @param types The tuple of buffer data types to use.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tuple<T extends Array<BufferDataType<any>>>(
	...types: T
): BufferDataType<InferBufferValuesFromObject<T>> {
	const size = types.size();

	return {
		size: () => {
			let total = size;

			for (const dataType of types) {
				total += dataType.size();
			}

			return total;
		},

		read: (reader) => {
			const args = new Array(size) as InferBufferValuesFromObject<T>;

			for (const index of $range(0, size - 1)) {
				args[index] = types[index].read(reader);
			}

			return args;
		},

		write: (writer, value) => {
			for (const index of $range(0, size - 1)) {
				types[index].write(writer, value);
			}
		},
	};
}
