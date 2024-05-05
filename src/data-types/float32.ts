import { THIRTY_TWO_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const float32: BufferDataType<number> = {
	size: () => THIRTY_TWO_BIT_SIZE,
	read: (reader) => reader.readFloat32(),
	write: (writer, value) => {
		writer.writeFloat32(value);
	},
};
