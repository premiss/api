import { StepExecutionInspector, StepResult } from "./";

export class StepExecutor
{
	constructor(private step: () => Promise<void>)
	{
	}

	public async executeStep(stepExecutionInspector: StepExecutionInspector): Promise<void>
	{
		const stepResult = await this.execute();
		stepExecutionInspector(stepResult);
	}

	private async execute(): Promise<StepResult>
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