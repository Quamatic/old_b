import { THIRTY_TWO_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const int32: BufferDataType<number> = {
	size: () => THIRTY_TWO_BIT_SIZE,
	read: (reader) => reader.readi32(),
	write: (writer, value) => {
		writer.writei32(value);
	},
};
