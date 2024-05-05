import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function color(dataType: BufferDataType<number> = float32): BufferDataType<Color3> {
	return {
		size: () => {
			return dataType.size() * 3;
		},

		read: (reader) => {
			const r = dataType.read(reader);
			const g = dataType.read(reader);
			const b = dataType.read(reader);

			return Color3.fromRGB(r, g, b);
		},

		write: (writer, value) => {
			dataType.write(writer, value.R * 255);
			dataType.write(writer, value.G * 255);
			dataType.write(writer, value.B * 255);
		},
	};
}
