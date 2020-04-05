import { ProofStep, ExecutionResult } from "../";

export interface StepExecutionResultSet
{
	readonly [ProofStep.arrange]: ExecutionResult;
	readonly [ProofStep.act]: ExecutionResult;
	readonly [ProofStep.assert]: ExecutionResult;
	readonly [ProofStep.annul]: ExecutionResult;
}