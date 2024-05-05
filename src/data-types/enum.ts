import { EIGHT_BIT_SIZE, SIXTEEN_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

type InferEnumItems<E extends Enum> = {
	[K in keyof E]: E[K] extends EnumItem ? E[K] : never;
}[keyof E];

const EIGHT_BIT_THRESHOLD = (1 << EIGHT_BIT_SIZE) - 1;

export function _enum<E extends Enum>(rbx: E): BufferDataType<InferEnumItems<E>> {
	const enums = rbx.GetEnumItems();

	// As of now, the highest enum size is 254 (lol) which is held by Enum.KeyCode.
	// So currently, no enums will require a 16-bit value.
	// But this is done just for future proofing.
	const isEightBitSized = enums.size() < EIGHT_BIT_THRESHOLD;

	return {
		size: () => (isEightBitSized ? EIGHT_BIT_SIZE : SIXTEEN_BIT_SIZE),

		read: (reader) => {
			const index = isEightBitSized ? reader.readUInt8() : reader.readUInt16();
			const value = enums[index];

			return value as InferEnumItems<E>;
		},

		write: (writer, value) => {
			if (isEightBitSized) {
				writer.writeUInt8(value.Value);
			} else {
				writer.writeUInt16(value.Value);
			}
		},
	};
}

export { _enum as enum };
