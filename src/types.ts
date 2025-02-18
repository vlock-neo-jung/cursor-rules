/**
 * 파일 복사 작업 결과
 */
export interface CopyResult {
  success: boolean;
  copied: string[];
  skipped: string[];
  errors: Array<{
    file: string;
    error: string;
  }>;
}

/**
 * 파일 복사 에러 타입
 */
export class CopyError extends Error {
  constructor(
    public readonly file: string,
    public readonly reason: string,
    public readonly cause?: Error
  ) {
    super(`${file} 파일 복사 실패: ${reason}`);
    this.name = "CopyError";
  }
}

/**
 * 권한 에러 타입
 */
export class PermissionError extends Error {
  constructor(
    public readonly path: string,
    public readonly operation: "read" | "write",
    public readonly cause?: Error
  ) {
    super(
      `${path}에 대한 ${
        operation === "read" ? "읽기" : "쓰기"
      } 권한이 없습니다.`
    );
    this.name = "PermissionError";
  }
}
