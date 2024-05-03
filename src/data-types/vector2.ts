import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function vector2(type: BufferDataType<number> = float32): BufferDataType<Vector2> {
	return {
		size: () => {
			return type.size() * 2;
		},

		read: (reader) => {
			const x = type.read(reader);
			const y = type.read(reader);

			return new Vector2(x, y);
		},

		write: (writer, value) => {
			writer.allocate(type.size() * 2);

			type.write(writer, value.X);
			type.write(writer, value.Y);
		},
	};
}
