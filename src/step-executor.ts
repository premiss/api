import { StepResult } from "./step-result";

export class StepExecutor
{
	public async executeStep(step: () => Promise<void>): Promise<StepResult>
	{
		try
		{
			await step();
			return { passed: true, error: undefined };
		}
		catch (error)
		{
			return { passed: false, error: error };
		}
	}
}