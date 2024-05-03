import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function vector3(type: BufferDataType<number> = float32): BufferDataType<Vector3> {
	return {
		size: () => {
			return type.size() * 3;
		},

		read: (reader) => {
			const x = type.read(reader);
			const y = type.read(reader);
			const z = type.read(reader);

			return new Vector3(x, y, z);
		},

		write: (writer, value) => {
			writer.allocate(type.size() * 3);

			type.write(writer, value.X);
			type.write(writer, value.Y);
			type.write(writer, value.Z);
		},
	};
}
