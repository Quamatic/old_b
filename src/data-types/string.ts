import { BufferDataType } from "./types";

function str<T extends string = string>(): BufferDataType<T> {
	return {
		size: (value) => (value !== undefined ? value.size() : 0),
		read: (reader) => reader.readstring() as T,
		write: (writer, value) => {
			writer.writestring(value);
		},
	};
}

export { str as string };
