import { endStepExaminer, StepExaminer, StepResult, StepExecutionResultSet, stepExecutionResultSetFactory, Subject, timedAsyncCall, TimedResult } from "../";

type StepExecutorResult = { stepResult: StepResult; nextStepExaminer: StepExaminer; };

const createErrorStepResult = (subject: Subject, error: unknown): StepExecutorResult =>
{
	const passed = false;
	const proofStep = subject.proofStep;
	const stepExecutionError = { error, proofStep };
	const stepResult = { passed, stepExecutionError };
	const nextStepExaminer = endStepExaminer;
	return { stepResult, nextStepExaminer };
};

const executeStep = async (subject: Subject, nextStepExaminer: StepExaminer): Promise<StepExecutorResult> =>
{
	await subject.proofStepSignature();
	const passed = true;
	const stepExecutionError = undefined;
	const stepResult = { passed, stepExecutionError };
	return { stepResult, nextStepExaminer };
};

const stepExecutorResultFactory = async (subject: Subject, nextStepExaminer: StepExaminer): Promise<TimedResult<StepExecutorResult>> =>
{
	return await timedAsyncCall(async () => {
		try
		{
			return await executeStep(subject, nextStepExaminer);
		}
		catch (error)
		{
			return createErrorStepResult(subject, error);
		}
	});
};

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		const timedExecuteResult = await stepExecutorResultFactory(this.subject, this.nextStepExaminer);
		stepExecutionResultSet = stepExecutionResultSetFactory(stepExecutionResultSet, this.subject.proofStep, timedExecuteResult.result.stepResult, timedExecuteResult.elapsedNanoSeconds);
		return timedExecuteResult.result.nextStepExaminer.probe(stepExecutionResultSet);
	}
}