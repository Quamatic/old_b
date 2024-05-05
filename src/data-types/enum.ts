import { EIGHT_BIT_SIZE, SIXTEEN_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

type InferEnumItems<E extends Enum> = {
	[K in keyof E]: E[K] extends EnumItem ? E[K] : never;
}[keyof E];

const EIGHT_BIT_THRESHOLD = (1 << EIGHT_BIT_SIZE) - 1;

export function _enum<E extends Enum>(rbx: E): BufferDataType<InferEnumItems<E>> {
	// Most enums dont have anywhere close to a size above 255.
	// But just in case, we will allow for u16 values when needed.
	// I only check for eight bit vs sixteen bit because it's obvious there's no need to check for anything higher lol
	const enums = rbx.GetEnumItems();
	const isEightBitSized = enums.size() < EIGHT_BIT_THRESHOLD;

	return {
		size: () => (isEightBitSized ? EIGHT_BIT_SIZE : SIXTEEN_BIT_SIZE),

		read: (reader) => {
			const index = isEightBitSized ? reader.readu8() : reader.readu16();
			const value = enums[index];

			return value as InferEnumItems<E>;
		},

		write: (writer, value) => {
			if (isEightBitSized) {
				writer.writeu8(value.Value);
			} else {
				writer.writeu16(value.Value);
			}
		},
	};
}

export { _enum as enum };
