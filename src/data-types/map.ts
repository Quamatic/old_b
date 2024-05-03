import { BufferDataType } from "./types";

export function map<K extends defined, V extends defined>(
	key: BufferDataType<K>,
	value: BufferDataType<V>,
): BufferDataType<Map<K, V>> {
	return {
		size: () => {
			return 0;
		},

		read: (reader) => {
			const map = new Map<K, V>();
			const length = reader.readu16();

			for (const _ of $range(0, length - 1)) {
				const k = key.read(reader);
				const v = value.read(reader);

				map.set(k, v);
			}

			return map;
		},

		write: (writer, map) => {
			const length = map.size();
			writer.writeu16(length);

			for (const [k, v] of map) {
				key.write(writer, k);
				value.write(writer, v);
			}
		},
	};
}
