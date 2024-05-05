import { SIXTEEN_BIT_SIZE } from "../constants";
import { BufferDataType } from "./types";

/**
 * Represents a buffer data type for 16-bit floating point numbers (float16).
 */
export const float16: BufferDataType<number> = {
	size: () => SIXTEEN_BIT_SIZE,

	read: (reader) => {
		const b0 = reader.readUInt8();
		const b1 = reader.readUInt8();

		const signed = bit32.btest(b0, 128);
		const exponent = (b0 & 127) >> 2;
		let mantissa = ((b0 & 3) << 8) + b1;

		if (exponent === 31) {
			return mantissa !== 0 ? 0 / 0 : signed ? -math.huge : math.huge;
		} else if (exponent === 0) {
			return mantissa === 0 ? 0 : signed ? -math.ldexp(mantissa / 1024, -14) : math.ldexp(mantissa / 1024, -14);
		} else {
			mantissa = mantissa / 1024 + 1;

			return signed ? -math.ldexp(mantissa, exponent - 15) : math.ldexp(mantissa, exponent - 15);
		}
	},

	write: (writer, value) => {
		writer.allocate(SIXTEEN_BIT_SIZE);

		const signed = value < 0;
		value = math.abs(value);

		let [mantissa, exponent] = math.frexp(value);

		let coefficient: number;
		let trailing: number;

		if (value === math.huge) {
			coefficient = signed ? 0b01111100 : 0b01111100;
			trailing = 0;
		} else if (value !== value || value === 0) {
			coefficient = 0;
			trailing = 0;
		} else if (exponent + 15 <= 1) {
			mantissa = math.floor(mantissa * 1024 + 0.5);

			coefficient = signed ? 128 + (mantissa >> 8) : mantissa >> 8;
			trailing = mantissa & 0xff;
		} else {
			mantissa = math.floor((mantissa - 0.5) * 2048 + 0.5);

			const shift = ((exponent + 14) << 2) + (mantissa >> 8);

			coefficient = signed ? 128 + shift : shift;
			trailing = mantissa & 0xff;
		}

		writer.writeUInt8(coefficient);
		writer.writeUInt8(mantissa);
	},
};
