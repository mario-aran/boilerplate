export const runScriptWithTryCatch = async (
  processName: string,
  fn: () => Promise<void>,
) => {
  try {
    await fn();
    console.log(`${processName} completed successfully`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`${processName} failed: ${errorMessage}`);
  }
};
