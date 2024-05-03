import { BufferDataType } from "./types";

const buf: BufferDataType<buffer> = {
	size: () => 0,
	read: (reader) => reader.readcopy(),
	write: (writer, value) => {
		writer.writecopy(value);
	},
};

export { buf as buffer };
