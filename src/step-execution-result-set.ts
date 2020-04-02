import { ProofStep, StepExecutionResult } from "./";

export type StepExecutionResultSet = Readonly<{ [Key in keyof typeof ProofStep]: StepExecutionResult }>;