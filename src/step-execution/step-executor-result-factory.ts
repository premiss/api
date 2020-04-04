import { timedAsyncCall, TimedResult } from "../timing";
import { StepExaminer } from "./";
import { endStepExaminer } from "./end-step-examiner";
import { StepExecutorResult } from "./step-executor-result";
import { Subject } from "./subject";

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

export const stepExecutorResultFactory = async (subject: Subject, nextStepExaminer: StepExaminer): Promise<TimedResult<StepExecutorResult>> =>
{
	return await timedAsyncCall(async () =>
	{
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
