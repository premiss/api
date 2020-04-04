import { endStepExaminer, StepExaminer, StepResult, StepExecutionResultSet, stepExecutionResultSetFactory, Subject, timedAsyncCall } from "../";

type StepExecutorResult = { stepResult: StepResult; nextStepExaminer: StepExaminer; };

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		const timedExecuteResult = await timedAsyncCall(() => this.getStepExecutorResult());
		stepExecutionResultSet = stepExecutionResultSetFactory(stepExecutionResultSet, this.subject.proofStep, timedExecuteResult.result.stepResult, timedExecuteResult.elapsedNanoSeconds);
		return timedExecuteResult.result.nextStepExaminer.probe(stepExecutionResultSet);
	}

	private async getStepExecutorResult(): Promise<StepExecutorResult>
	{
		try
		{
			return await this.executeStep();
		}
		catch (error)
		{
			return this.createErrorStepResult(error);
		}
	}

	private async executeStep(): Promise<StepExecutorResult>
	{
		await this.subject.proofStepSignature();
		const passed = true;
		const stepExecutionError = undefined;
		const stepResult = { passed, stepExecutionError };
		const nextStepExaminer = this.nextStepExaminer;
		return { stepResult, nextStepExaminer };
	}

	private createErrorStepResult(error: unknown): StepExecutorResult
	{
		const passed = false;
		const proofStep = this.subject.proofStep;
		const stepExecutionError = { error, proofStep };
		const stepResult = { passed, stepExecutionError };
		const nextStepExaminer = endStepExaminer;
		return { stepResult, nextStepExaminer };
	}
}