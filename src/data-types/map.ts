import { BufferDataType } from "./types";
import { uint16 } from "./uint16";

/**
 * Creates a buffer data type representing a Map of key-value pairs.
 * @param key The buffer data type of the keys in the Map.
 * @param value The buffer data type of the values in the Map.
 * @param length The buffer data type representing the length of the Map (default: uint16).
 */
export function map<K extends defined, V extends defined>(
	key: BufferDataType<K>,
	value: BufferDataType<V>,
	length: BufferDataType<number> = uint16,
): BufferDataType<Map<K, V>> {
	return {
		size: () => {
			let size = length.size();

			return size;
		},

		read: (reader) => {
			const map = new Map<K, V>();
			const size = length.read(reader);

			for (const _ of $range(0, size - 1)) {
				const k = key.read(reader);
				const v = value.read(reader);

				map.set(k, v);
			}

			return map;
		},

		write: (writer, map) => {
			length.write(writer, map.size());

			for (const [k, v] of map) {
				key.write(writer, k);
				value.write(writer, v);
			}
		},
	};
}
