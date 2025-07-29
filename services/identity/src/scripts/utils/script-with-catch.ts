export const scriptCatchAsync = async (
  processName: string,
  asyncFn: () => Promise<void>,
) => {
  try {
    await asyncFn();

    console.log(`${processName} completed successfully`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`${processName} failed: ${errorMessage}`);
  }
};
