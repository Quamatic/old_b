import { SIXTEEN_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const uint16: BufferDataType<number> = {
	size: () => SIXTEEN_BIT_SIZE,
	read: (reader) => reader.readu16(),
	write: (writer, value) => {
		writer.writeu16(value);
	},
};
