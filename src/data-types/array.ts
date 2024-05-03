import { BufferDataType } from "./types";
import { uint16 } from "./uint16";

/**
 * Creates a data type that represents an array
 *
 * @param type The buffer data type that represents a value in the array
 * @param length Optional number type that will write the array's length. Defaults to 2 bytes (u16)
 *  */
export function array<T>(type: BufferDataType<T>, length: BufferDataType<number> = uint16): BufferDataType<T[]> {
	return {
		size: () => 0,

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
