import { Logger, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CustomLogger extends Logger {
  private logStream: fs.WriteStream;

  constructor(context: string) {
    super(context);
    this.logStream = fs.createWriteStream('application.log', { flags: 'a' }); // Ghi log vào file application.log
  }

  log(message: string) {
    // Ghi log thông thường
    super.log(message);
    this.writeLogToFile('LOG', message);
  }

  error(message: string, trace: string) {
    // Ghi log lỗi
    super.error(message, trace);
    this.writeLogToFile('ERROR', `${message} - Trace: ${trace}`);
  }

  warn(message: string) {
    // Ghi log cảnh báo
    super.warn(message);
    this.writeLogToFile('WARN', message);
  }

  debug(message: string) {
    // Ghi log debug
    super.debug(message);
    this.writeLogToFile('DEBUG', message);
  }

  verbose(message: string) {
    // Ghi log chi tiết
    super.verbose(message);
    this.writeLogToFile('VERBOSE', message);
  }

  private writeLogToFile(level: string, message: string) {
    const logMessage = `${new Date().toISOString()} [${level}] ${message}\n`;
    this.logStream.write(logMessage); // Ghi log vào file
  }
}
