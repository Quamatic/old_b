import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function vector3(dataType: BufferDataType<number> = float32): BufferDataType<Vector3> {
	return {
		size: () => {
			return dataType.size() * 3;
		},

		read: (reader) => {
			const x = dataType.read(reader);
			const y = dataType.read(reader);
			const z = dataType.read(reader);

			return new Vector3(x, y, z);
		},

		write: (writer, value) => {
			writer.allocate(dataType.size() * 3);

			dataType.write(writer, value.X);
			dataType.write(writer, value.Y);
			dataType.write(writer, value.Z);
		},
	};
}
