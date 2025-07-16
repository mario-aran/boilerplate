// Types
interface RunScriptWithCatchProps {
  processName: string;
  asyncFn: () => Promise<void>;
}

export const runtScriptWithCatch = async ({
  processName,
  asyncFn,
}: RunScriptWithCatchProps) => {
  try {
    await asyncFn();
    console.log(`${processName} completed successfully`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`${processName} failed: ${errorMessage}`);
  }
};
