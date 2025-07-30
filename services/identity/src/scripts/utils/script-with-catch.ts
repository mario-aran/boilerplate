export const scriptCatchAsync = async (asyncFn: () => Promise<void>) => {
  try {
    await asyncFn();

    console.log('Script completed successfully');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'unknown error';
    throw new Error(`Script failed: ${errorMessage}`);
  }
};
