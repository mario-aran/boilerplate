// Types
interface ScriptCatchAsyncParams {
  processName: string;
  asyncFn: () => Promise<void>;
}

export const scriptCatchAsync = async ({
  processName,
  asyncFn,
}: ScriptCatchAsyncParams) => {
  try {
    await asyncFn();
    console.log(`${processName} completed successfully`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`${processName} failed: ${errorMessage}`);
  }
};
