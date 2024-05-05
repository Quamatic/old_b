import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function vector2(dataType: BufferDataType<number> = float32): BufferDataType<Vector2> {
	return {
		size: () => {
			return dataType.size() * 2;
		},

		read: (reader) => {
			const x = dataType.read(reader);
			const y = dataType.read(reader);

			return new Vector2(x, y);
		},

		write: (writer, value) => {
			writer.allocate(dataType.size() * 2);

			dataType.write(writer, value.X);
			dataType.write(writer, value.Y);
		},
	};
}
