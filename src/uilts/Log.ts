export interface Log {
  type: string;
  content: string;
  timestamp: number;
}

class LogUtils {
  static logs: Log[] = [];

  static add = (log: Log, cb: any) => {
    LogUtils.logs.push(log);
    cb(LogUtils.logs);
  };

  static clear = (cb: any) => {
    LogUtils.logs = [];
    cb(LogUtils.logs);
  };
}

export default LogUtils;
