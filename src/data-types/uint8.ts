import { EIGHT_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const uint8: BufferDataType<number> = {
	size: () => EIGHT_BIT_SIZE,
	read: (reader) => reader.readu8(),
	write: (writer, value) => {
		writer.writeu8(value);
	},
};
