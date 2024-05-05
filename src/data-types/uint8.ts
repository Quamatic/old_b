import { EIGHT_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const uint8: BufferDataType<number> = {
	size: () => EIGHT_BIT_SIZE,
	read: (reader) => reader.readUInt8(),
	write: (writer, value) => {
		writer.writeUInt8(value);
	},
};
