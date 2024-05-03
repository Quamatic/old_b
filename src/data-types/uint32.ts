import { THIRTY_TWO_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const uint32: BufferDataType<number> = {
	size: () => THIRTY_TWO_BIT_SIZE,
	read: (reader) => reader.readu32(),
	write: (writer, value) => {
		writer.writeu32(value);
	},
};
