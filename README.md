#  Premiss  
[![test status](https://github.com/premiss/api/workflows/test/badge.svg?branch=master)](https://github.com/premiss/api/actions)
[![coverage](https://badgen.net/codecov/c/github/premiss/api)](https://codecov.io/gh/premiss/api?flag=premiss)
[![CC0-1.0](https://badgen.net/github/license/premiss/api)](https://creativecommons.org/publicdomain/zero/1.0/)
[![npm](https://badgen.net/npm/v/@premiss/api)](https://www.npmjs.com/package/@premiss/api)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)   

Premiss is a testing library written in TypeScript to provide an API for testing code. It is not a framework, therefore 
it does not provide a cli, runner, assertions, test doubles, or other integrations. The library provides an interface to 
represent the “Arrange-Act-Assert” testing pattern, with the addition of “Annul” for what should be the rare case you 
need to clean up.

## Table of Contents
* [Motivation](#motivation)
* [Example](#example)
* [API Reference](#api-reference)
    * [Implementations](#implementations)
        * [a class implementaion of the proof interface](#a-class-implementation-of-the--proof-interface)
        * [an object literal implementation of the proof interface](#an-object-literal-implementation-of-the-proof-interface)
        * [the mimimum proof interface implementation](#the-minimum-proof-interface-implementation)
        * [running a test](#running-a-test)
    * [Test result variations](#test-result-variations)
        * [a passing test result with no annul defined](#a-passing-test-result-with-no-annul-defined)
        * [a failing test result with successful annul step](#a-failing-test-result-with-successful-annul-step)
* [Some words](#some-words)
* [License](#license)


## Motivation
There are two main reasons for this project. The first is most of what’s out there for testing are frameworks and I try 
to avoid frameworks. The other is an intent to keep a single test cohesive through constraining the shape of the test so 
that it has a single reason to exist. And as a side bonus, I used this as an opportunity to use the 
[TCR](https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864) workflow to build this.

## Example
[String Calcluator Kata Example](https://github.com/premiss/api/tree/master/example)

## API Reference
The API has a single entry point, the verify function. The verify function takes a proof interface, evaluates it, and 
returns a proof examination result. The result contains the outcome of the examination along with timings. The 
examination outcome indicates if the proof `passed` or `failed` and when failed the step the failure occurred at. Only 
the assert method signature is required.

### Implementations
#### A class implementation of the  proof interface
```typescript
import { Proof } from "@premiss/api";

export class YourAmazingTest implements Proof
{
    public async arrange(): Promise<void>
    {
        // Set up for winning
    }

    public async act(): Promise<void>
    {
        // Execute the winning
    }

    public async assert(): Promise<void>
    {
        // Count your winnings
    }

    public async annul(): Promise<void>
    {
        // Give you winnings away?
        // No really why do you have to clean up?
    }
}
```

#### An object literal implementation of the proof interface
```typescript
import { Proof, ProofStep } from "@premiss/api";

export const YourAmazingTest =
    {
        [ProofStep.arrange]: async (): Promise<void> =>
        {
            // Set up for winning
        },

        [ProofStep.act]: async (): Promise<void> =>
        {
            // Execute the winning
        },

        [ProofStep.assert]: async (): Promise<void> =>
        {
            // Count your winnings
        },

        [ProofStep.annul]: async (): Promise<void> =>
        {
            // Give your winnings away?
            // No really why do you have to clean up?
        }
    }
```

#### The minimum proof interface implementation
```typescript
import { Proof } from "@premiss/api";

export class YourAmazingTest implements Proof
{
    public async assert(): Promise<void>
    {
        // Count your winnings
    }
}
```

#### Running a test
```typescript
import { verify } from "@premiss/api";

const myTestResult = (async (): Promise<TimedResult<ProofExaminationResult>> => {
    // new up your test
    const proof = new YourAmazingTest();
    // run your test
    return await verify(proof);
})();
// do what you want with your test results
```

### Test result variations
#### A passing test result with no annul defined
```typescript
{
    elapsedNanoseconds: 1292900n,
    result: 
    {
        examinationOutcome: ExaminationOutcomeObserved.passed,
        examinationResultSet: 
        {
            arrange: 
            {
                elapsedNanoseconds: 132401n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeObserved.passed
                }
            },
            act: 
            {
                elapsedNanoseconds: 568600n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeObserved.passed
                }
            },
            assert: 
            {
                elapsedNanoseconds: 65301n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeObserved.passed
                }
            },
            annul: 
            {
                elapsedNanoseconds: 0n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeUnobserved.skipped
                }
            },
            elapsedNanoseconds: 766302n
        }
    }
}
```

#### A failing test result with successful annul step
```typescript
{
    elapsedNanoseconds: 1422101n,
    result: 
    {
        examinationOutcome: ExaminationOutcomeObserved.failed,
        examinationError: 
        {
            error:
            {
                generatedMessage: false,
                code: "ERR_ASSERTION",
                actual: 1003,
                expected: 2,
                operator: "strictEqual",
                message: "The assertion error message"
            },
            proofStep: ProofStep.assert
        },
        examinationResultSet: 
        {
            arrange: 
            {
                elapsedNanoseconds: 132401n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeObserved.passed
                }
            },
            act: 
            {
                elapsedNanoseconds: 568600n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeObserved.passed
                }
            },
            assert: 
            {
                elapsedNanoseconds: 65301n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeObserved.failed,
                    examinationError: 
                    {
                        error:
                        {
                            generatedMessage: false,
                            code: "ERR_ASSERTION",
                            actual: 1003,
                            expected: 2,
                            operator: "strictEqual",
                            message: "The assertion error message"
                        },
                        proofStep: ProofStep.assert
                    }
                }
            },
            annul: 
            {
                elapsedNanoseconds: 129201n,
                result: 
                {
                    examinationOutcome: ExaminationOutcomeObserved.passed
                }
            },
            elapsedNanoseconds: 895503n
        }
    }
}
```
## Some words
&ndash; **premiss** <sub>verb</sub>   
* to set fourth beforehand as an introduction or a postulate  
&nbsp;   

&ndash; **pre-** <sub>prefix</sub>   
* earlier than : prior to : before   

&ndash; **miss** <sub>verb</sub>   
* to fail

## License
[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)