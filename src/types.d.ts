export interface SharedBufferOperations {
	/**
	 * Returns the current known size of the buffer.
	 *
	 * This is not always the same as the actual buffer length (via {@link buffer.len})
	 */
	getSize(): number;
	/**
	 * Returns a reference to the internal {@link buffer}
	 */
	getBuffer(): buffer;
	/**
	 * Sets the current cursor (also known as the offset) which points to the current position
	 * of the internal buffer.
	 *
	 * @param cursor
	 */
	setCursor(cursor: number): void;
	/**
	 * Resets the cursor to 0.
	 */
	resetCursor(): void;
}