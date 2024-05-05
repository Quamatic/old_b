import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function cframe(dataType: BufferDataType<number> = float32): BufferDataType<CFrame> {
	return {
		size: () => {
			return dataType.size() * 6;
		},

		read: (reader) => {
			const x = dataType.read(reader);
			const y = dataType.read(reader);
			const z = dataType.read(reader);

			const rX = dataType.read(reader);
			const rY = dataType.read(reader);
			const rZ = dataType.read(reader);

			return new CFrame(x, y, z).mul(CFrame.Angles(rX, rY, rZ));
		},

		write: (writer, value) => {
			writer.allocate(dataType.size() * 6);

			dataType.write(writer, value.X);
			dataType.write(writer, value.Y);
			dataType.write(writer, value.Z);

			const [rX, rY, rZ] = value.ToEulerAnglesXYZ();

			dataType.write(writer, rX);
			dataType.write(writer, rY);
			dataType.write(writer, rZ);
		},
	};
}
