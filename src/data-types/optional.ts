import { BufferDataType } from "./types";

export function optional<T>(type: BufferDataType<T>): BufferDataType<T | undefined> {
	return {
		size: () => {
			return 0;
		},

		read: (reader) => {
			const isPresent = reader.readboolean();
			return isPresent ? type.read(reader) : undefined;
		},

		write: (writer, value) => {
			const isPresent = value !== undefined;
			writer.writeboolean(isPresent);

			if (isPresent) {
				type.write(writer, value);
			}
		},
	};
}