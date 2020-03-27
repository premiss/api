import { StepResult } from "./";

export class StepExecutor
{
	constructor(private step: () => Promise<void>)
	{
	}

	public async executeStep(): Promise<StepResult>
	{
		try
		{
			await this.step();
			return { passed: true, error: undefined };
		}
		catch (error)
		{
			return { passed: false, error: error };
		}
	}
}