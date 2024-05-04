/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from "@rbxts/services";

import { BufferDataType } from "./types";

type BufferTypesToUnion<T extends Array<BufferDataType<any>>> = {
	[K in keyof T]: T[K] extends BufferDataType<infer V> ? V : never;
}[number];

function hash(value: unknown) {
	return HttpService.JSONEncode(value)
		.split("")
		.reduce((a, b) => {
			a = (a << 5) - a + utf8.codepoint(b, 0)[0];
			return a;
		}, 0);
}

/**
 * Creates a buffer data type representing a union of multiple buffer data types.
 * @param types An array of buffer data types to be unioned.
 */
export function union<const T extends Array<BufferDataType<any>>>(...types: T): BufferDataType<BufferTypesToUnion<T>> {
	const hashes = types.map(hash);

	return {
		size: () => 0,

		read: (reader) => {
			const index = reader.readu8();
			const type = types[index];

			return type.read(reader) as BufferTypesToUnion<T>;
		},

		write: (writer, value) => {
			const discriminator = hash(value);
			writer.writeu8(discriminator);

			const type = types.find((_, index) => hashes[index] === discriminator);
			type?.write(writer, value);
		},
	};
}
