import { SIXTY_FOUR_BIT_SIZE, THIRTY_TWO_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

// There are optimizations we could do to maybe shave a byte off, but honestly its not worth all of the effort -
// especially since 4 bytes is already really small anyway.

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
