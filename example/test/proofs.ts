import { AnyLengthDelimiterReturnsSumTest } from "./any-length-delimiter-returns-sum.test";
import { AnyLengthManyDefinedDelimitersReturnsSumTest } from "./any-length-many-defined-delimiters-returns-sum-test";
import { DefineDelimiterReturnsSumTest } from "./define-delimiter-returns-sum.test";
import { EmptyReturnsZeroTest } from "./empty-returns-zero.test";
import { IgnoreLargeValuesReturnsSmallerSumTest } from "./ignore-large-values-returns-smaller-sum.test";
import { ManyDefinedDelimitersReturnsSumTest } from "./many-defined-delimiters-returns-sum-test";
import { NegativeValuesThrowsMessageTest } from "./negative-values-throws-message.test";
import { NewlineDelimiterReturnsSumTest } from "./newline-delimiter-returns-sum.test";
import { SingleReturnsSameTest } from "./single-returns-same.test";
import { TwoValuesReturnsSumTest } from "./two-values-returns-sum.test";
import { UnknownValuesReturnsSumTest } from "./unknown-values-returns-sum.test";

export const proofs = [
	new EmptyReturnsZeroTest(),
	new SingleReturnsSameTest(),
	new TwoValuesReturnsSumTest(),
	new UnknownValuesReturnsSumTest(),
	new NewlineDelimiterReturnsSumTest(),
	new DefineDelimiterReturnsSumTest(),
	new NegativeValuesThrowsMessageTest(),
	new IgnoreLargeValuesReturnsSmallerSumTest(),
	new AnyLengthDelimiterReturnsSumTest(),
	new ManyDefinedDelimitersReturnsSumTest(),
	new AnyLengthManyDefinedDelimitersReturnsSumTest()
];