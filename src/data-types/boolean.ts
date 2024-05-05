import { EIGHT_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const boolean: BufferDataType<boolean> = {
	size: () => EIGHT_BIT_SIZE,
	read: (reader) => reader.readBoolean(),
	write: (writer, value) => {
		writer.writeBoolean(value);
	},
};
