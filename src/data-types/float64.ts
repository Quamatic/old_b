import { SIXTY_FOUR_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

export const float64: BufferDataType<number> = {
	size: () => SIXTY_FOUR_BIT_SIZE,
	read: (reader) => reader.readFloat64(),
	write: (writer, value) => {
		writer.writeFloat64(value);
	},
};
