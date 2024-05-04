import { float32 } from "./float32";
import { BufferDataType } from "./types";

export function cframe(type: BufferDataType<number> = float32): BufferDataType<CFrame> {
	return {
		size: () => {
			return type.size() * 6;
		},

		read: (reader) => {
			const x = type.read(reader);
			const y = type.read(reader);
			const z = type.read(reader);

			const rX = type.read(reader);
			const rY = type.read(reader);
			const rZ = type.read(reader);

			return new CFrame(x, y, z).mul(CFrame.Angles(rX, rY, rZ));
		},

		write: (writer, value) => {
			writer.allocate(type.size() * 6);

			type.write(writer, value.X);
			type.write(writer, value.Y);
			type.write(writer, value.Z);

			const [rX, rY, rZ] = value.ToEulerAnglesXYZ();

			type.write(writer, rX);
			type.write(writer, rY);
			type.write(writer, rZ);
		},
	};
}
