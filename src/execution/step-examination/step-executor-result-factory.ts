import { ExecutionResult, ProofStep, ProofStepSignature, timedAsyncCall } from "../../index";
import { StepExaminer } from "./.";
import { endStepExaminer } from "./end-step-examiner";
import { StepExecutorResult } from "./step-executor-result";
import { Subject } from "./subject";

const executeStep = async(proofStepSignature: ProofStepSignature): Promise<ExecutionResult> => {
	await proofStepSignature();
	const passed = true;
	const executionError = undefined;
	return { passed, executionError };
};

const createErredExecutionResult = (error: unknown, proofStep: ProofStep): ExecutionResult => {
	const passed = false;
	const executionError = { error, proofStep };
	return { passed, executionError };
};

export const stepExecutorResultFactory = async (subject: Subject, nextStepExaminer: StepExaminer): Promise<StepExecutorResult> =>
{
	const executionResult = await timedAsyncCall(async () =>
	{
		try
		{
			return await executeStep(subject.proofStepSignature);
		}
		catch (error)
		{
			nextStepExaminer = endStepExaminer;
			return createErredExecutionResult(error, subject.proofStep);
		}
	});

	return { executionResult, nextStepExaminer };
};