import { BufferDataType } from "./types";

type TupleNativeValues<T> = {
	[K in keyof T]: T[K] extends BufferDataType<infer V> ? V : never;
};

export function tuple<T extends Array<BufferDataType<unknown>>>(types: [...T]): BufferDataType<TupleNativeValues<T>> {
	const size = types.size();

	return {
		size: () => 0,

		read: (reader) => {
			const args = new Array(size) as TupleNativeValues<T>;

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
