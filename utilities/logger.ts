/**
 * Logger utility class to wrap console methods with SHOW_LOG toggle.
 *
 * Usage:
 *   - Enable/disable logs by setting the env var `SHOW_LOG=true|false`.
 *   - Default: SHOW_LOG = true.
 */
export class Logger {
    /**
     * Whether logging is enabled (true) or disabled (false).
     * Controlled by the environment variable SHOW_LOG.
     */
    static readonly SHOW_LOG: boolean = (process.env.SHOW_LOG ?? 'true').toLowerCase() === 'true';

    /** Logs general information (default console.log). */
    static log(...args: any[]): void {
        if (Logger.SHOW_LOG) {
            console.log(...args);
        }
    }

    /** Logs informational messages (console.info). */
    static info(...args: any[]): void {
        if (Logger.SHOW_LOG) {
            console.info(...args);
        }
    }

    /** Logs debug messages (console.debug). */
    static debug(...args: any[]): void {
        if (Logger.SHOW_LOG) {
            console.debug(...args);
        }
    }

    /** Logs warnings (console.warn). */
    static warn(...args: any[]): void {
        if (Logger.SHOW_LOG) {
            console.warn(...args);
        }
    }

    /** Logs errors (always printed, not gated by SHOW_LOG). */
    static error(...args: any[]): void {
        console.error(...args);
    }

    /** Prints a stack trace (console.trace). */
    static trace(...args: any[]): void {
        if (Logger.SHOW_LOG) {
            console.trace(...args);
        }
    }

    /**
     * Logs tabular data as a table (console.table).
     * @param tabularData Array or object to display
     * @param properties Optional list of columns to include
     */
    static logData(_title: string, _data: any): void {}
    static logResult(_icon: string, _message: string, _data?: any): void {}

    static table(tabularData: any, properties?: string[]): void {
        if (Logger.SHOW_LOG) {
            console.table(tabularData, properties);
        }
    }

    /** Starts a new inline group (console.group). */
    static group(...label: any[]): void {
        if (Logger.SHOW_LOG) {
            console.group(...label);
        }
    }

    /** Ends the current inline group (console.groupEnd). */
    static groupEnd(): void {
        if (Logger.SHOW_LOG) {
            console.groupEnd();
        }
    }

    /** Starts a timer (console.time). */
    static time(label: string): void {
        if (Logger.SHOW_LOG) {
            console.time(label);
        }
    }

    /** Ends a timer (console.timeEnd). */
    static timeEnd(label: string): void {
        if (Logger.SHOW_LOG) {
            console.timeEnd(label);
        }
    }
}
