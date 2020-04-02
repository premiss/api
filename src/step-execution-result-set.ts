import { ProofStep, StepExecutionResult } from "./";

export type StepExecutionResultSet = Readonly<{ readonly [Key in keyof typeof ProofStep]: StepExecutionResult }>;