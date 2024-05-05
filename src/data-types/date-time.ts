import { SIXTY_FOUR_BIT_SIZE, THIRTY_TWO_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

// There are optimizations we could do to maybe shave a byte off, but honestly its not worth all of the effort -
// especially since 4 bytes is already really small anyway.

/**
 * Creates a buffer data type representing a {@link DateTime | date time} value.
 *
 * This function writes the Unix timestamp to the buffer and reconstructs it into a {@link DateTime} object when read.
 *
 * By default, the Unix timestamp is written as a UInt32, requiring 4 bytes.
 * If the `millis` parameter is set to `true`, the timestamp is written as a Float64, requiring an additional 4 bytes,
 * totaling 8 bytes.
 *
 * @param [millis=false] Whether to write the unix timestamp in millis or not. Defaults to `false`.
 */
export function dateTime(millis: boolean = false): BufferDataType<DateTime> {
	return {
		size: () => (millis ? THIRTY_TWO_BIT_SIZE : SIXTY_FOUR_BIT_SIZE),

		read: (reader) => {
			if (millis) {
				const unixTimestampMillis = reader.readFloat64();
				return DateTime.fromUnixTimestampMillis(unixTimestampMillis);
			} else {
				const unixTimestamp = reader.readUInt32();
				return DateTime.fromUnixTimestamp(unixTimestamp);
			}
		},

		write: (writer, value) => {
			if (millis) {
				writer.writeFloat64(value.UnixTimestampMillis);
			} else {
				writer.writeUInt32(value.UnixTimestamp);
			}
		},
	};
}
