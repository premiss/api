import { ProofStep, ProofStepSignature } from "../";
import { ExaminationResult, Examine, examinePassThru } from "../examination";
import { timedAsyncCall } from "../timing";
import { StepExaminationResult, StepSubject } from "./";

const executeStep = async (proofStepSignature: ProofStepSignature): Promise<ExaminationResult> =>
{
	await proofStepSignature();
	const passed = true;
	const examinationError = undefined;
	return { passed, examinationError };
};

const createErredExaminationResult = (error: unknown, proofStep: ProofStep): ExaminationResult =>
{
	const passed = false;
	const examinationError = { error, proofStep };
	return { passed, examinationError };
};

export const examineStep = async (subject: StepSubject, nextStepExamine: Examine): Promise<StepExaminationResult> =>
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