import { SIXTEEN_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const int16: BufferDataType<number> = {
	size: () => SIXTEEN_BIT_SIZE,
	read: (reader) => reader.readi16(),
	write: (writer, value) => {
		writer.writei16(value);
	},
};
