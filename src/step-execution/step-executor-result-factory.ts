import { timedAsyncCall } from "../timing";
import { StepExaminer } from "./";
import { endStepExaminer } from "./end-step-examiner";
import { StepExecutorResult } from "./step-executor-result";
import { Subject } from "./subject";

export const stepExecutorResultFactory = async (subject: Subject, nextStepExaminer: StepExaminer): Promise<StepExecutorResult> =>
{
	const executionResult = await timedAsyncCall(async () =>
	{
		try
		{
			await subject.proofStepSignature();
			const passed = true;
			const executionError = undefined;
			return { passed, executionError };
		}
		catch (error)
		{
			const passed = false;
			const proofStep = subject.proofStep;
			const executionError = { error, proofStep };
			nextStepExaminer = endStepExaminer;
			return { passed, executionError };
		}
	});

	return { executionResult, nextStepExaminer };
};