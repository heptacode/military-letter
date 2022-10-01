import pc from 'picocolors';

export const log = {
  getTsp(): string {
    return new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });
  },
  // Error
  e(str: string): void {
    console.error(`[${this.getTsp()}] ${pc.red(str)}`);
  },
  // Warning
  w(str: string): void {
    console.warn(`[${this.getTsp()}] ${pc.yellow(str)}`);
  },
  // Info
  i(str: string): void {
    console.info(`[${this.getTsp()}] ${pc.cyan(str)}`);
  },
  // Success
  s(str: string): void {
    console.log(`[${this.getTsp()}] ${pc.green(str)}`);
  },
  // Verbose
  v(str: string): void {
    console.log(`[${this.getTsp()}] ${pc.white(str)}`);
  },
  // Debug
  d(str: string): void {
    console.debug(`[${this.getTsp()}] ${pc.blue(str)}`);
  },
};
