import { Examine, examinePassThru } from "../examination";
import { timedAsyncCall } from "../timing";
import { erredExaminationResultFactory, executeStep, StepExaminationResult, StepSubject } from "./";

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
			return erredExaminationResultFactory(error, subject.proofStep);
		}
	});

	return { examinationResult, nextStepExamine };
};