import { BufferDataType } from "./types";

export function optional<T>(dataType: BufferDataType<T>): BufferDataType<T | undefined> {
	return {
		size: (value) => {
			return value === undefined ? 1 : dataType.size() + 1;
		},

		read: (reader) => {
			const isPresent = reader.readBoolean();
			return isPresent ? dataType.read(reader) : undefined;
		},

		write: (writer, value) => {
			const isPresent = value !== undefined;
			writer.writeBoolean(isPresent);

			if (isPresent) {
				dataType.write(writer, value);
			}
		},
	};
}
