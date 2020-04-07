import { ExaminationResult, ProofStep, ProofStepSignature, timedAsyncCall } from "../../index";
import { Examine } from "../examine";
import { examinePassThru } from "./examine-pass-thru";
import { StepExecutorResult } from "./step-executor-result";
import { Subject } from "./subject";

const executeStep = async(proofStepSignature: ProofStepSignature): Promise<ExaminationResult> => {
	await proofStepSignature();
	const passed = true;
	const executionError = undefined;
	return { passed, examinationError: executionError };
};

const createErredExaminationResult = (error: unknown, proofStep: ProofStep): ExaminationResult => {
	const passed = false;
	const executionError = { error, proofStep };
	return { passed, examinationError: executionError };
};

export const stepExecutorResultFactory = async (subject: Subject, nextStepExamine: Examine): Promise<StepExecutorResult> =>
{
	const examinationResult = await timedAsyncCall(async () =>
	{
		try
		{
			return await executeStep(subject.proofStepSignature);
		}
		catch (error)
		{
			nextStepExamine = examinePassThru;
			return createErredExaminationResult(error, subject.proofStep);
		}
	});

	return { examinationResult, nextStepExamine };
};