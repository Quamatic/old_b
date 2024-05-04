import { EIGHT_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const boolean: BufferDataType<boolean> = {
	size: () => EIGHT_BIT_SIZE,
	read: (reader) => reader.readboolean(),
	write: (writer, value) => {
		writer.writeboolean(value);
	},
};
