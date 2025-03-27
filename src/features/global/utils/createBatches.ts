/**
 * Splits an array into batches of a specified size.
 * @param items The array to be batched.
 * @param batchSize The size of each batch. Must be a positive integer.
 * @returns An array of batches, where each batch is an array of items.
 * @template T The type of elements in the input array.
 */
export function createBatches<T>(items: T[], batchSize: number): T[][] {
  // Validate that batchSize is a positive integer
  if (!Number.isInteger(batchSize) || batchSize <= 0) {
    throw new Error('Batch size must be a positive integer');
  }

  // Calculate the number of batches needed
  const numBatches = Math.ceil(items.length / batchSize);

  // Create batches by slicing the array
  return Array.from({ length: numBatches }, (_, i) =>
    items.slice(i * batchSize, (i + 1) * batchSize)
  );
}
