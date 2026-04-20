import { test } from '@playwright/test';

/**
 * A decorator function that wraps the target method in a `test.step` block for step-based reporting.
 *
 * @param {string} [stepName] - Optional name for the step. If not provided, it will default to `ClassName.methodName`.
 * @returns {(target: (this: any, ...args: any[]) => any, context: ClassMethodDecoratorContext) => (this: any, ...args: any[]) => any}
 */
export function step(stepName?: string):
    (target: (this: any, ...args: any[]) => any, context: ClassMethodDecoratorContext) => (this: any, ...args: any[]) => any {
    return function decorator(target: (this: any, ...args: any[]) => any, context: ClassMethodDecoratorContext) {
        return function replacementMethod(this: any, ...args: any[]) {
            const name = stepName ?? `${this.constructor.name}.${String(context.name)}`;
            return test.step(name, () => target.apply(this, args));
        };
    };
}
