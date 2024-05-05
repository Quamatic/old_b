import { SIXTEEN_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const int16: BufferDataType<number> = {
	size: () => SIXTEEN_BIT_SIZE,
	read: (reader) => reader.readInt16(),
	write: (writer, value) => {
		writer.writeInt16(value);
	},
};
