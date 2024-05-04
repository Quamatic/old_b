import { BufferDataType } from "./types";
import { uint16 } from "./uint16";

/**
 * CCreates a buffer data type representing an array of a specific type.
 *
 * @param type The buffer data type of the elements in the array.
 * @param length The buffer data type representing the length of the array (default: uint16).
 */
export function array<T>(type: BufferDataType<T>, length: BufferDataType<number> = uint16): BufferDataType<T[]> {
	return {
		size: (value) => {
			let size = length.size();

			return size;
		},

		read: (reader) => {
			const size = length.read(reader);
			const array = new Array<T>(size);

			for (const index of $range(0, size - 1)) {
				array[index] = type.read(reader);
			}

			return array;
		},

		write: (writer, value) => {
			const size = value.size();
			length.write(writer, size);

			for (const index of $range(0, size - 1)) {
				type.write(writer, value[index]);
			}
		},
	};
}
