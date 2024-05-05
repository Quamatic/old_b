import { BufferDataType } from "./types";

/**
 * Creates a buffer data type representing a value that is "optional." In other words, the value
 * doesn't have to be present.
 *
 * The size of this data type is always at least `1` byte, as a boolean (UInt8) value is stored to determine if the value is present or not.
 *
 * When the value is not present, the size is always `1` byte.
 *
 * When the value is present, the size is `1` byte (for the boolean flag) followed by the size of the provided data type.
 *
 * @param dataType The buffer data type to use for present values.
 */
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
