import { BufferDataType } from "./types";

const buf: BufferDataType<buffer> = {
	size: () => 0,
	read: (reader) => reader.readBuffer(),
	write: (writer, value) => {
		writer.writeBuffer(value);
	},
};

export { buf as buffer };
