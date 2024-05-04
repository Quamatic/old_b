import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function color(type: BufferDataType<number> = float32): BufferDataType<Color3> {
	return {
		size: () => {
			return type.size() * 3;
		},

		read: (reader) => {
			const r = type.read(reader);
			const g = type.read(reader);
			const b = type.read(reader);

			return Color3.fromRGB(r, g, b);
		},

		write: (writer, value) => {
			type.write(writer, value.R * 255);
			type.write(writer, value.G * 255);
			type.write(writer, value.B * 255);
		},
	};
}
