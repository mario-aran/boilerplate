// Types
interface RunScriptParams {
  processName: string;
  scriptFn: () => Promise<void>;
}

export const runScript = async ({ processName, scriptFn }: RunScriptParams) => {
  try {
    await scriptFn();
    console.log(`${processName} completed successfully`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`${processName} failed: ${errorMessage}`);
  }
};
