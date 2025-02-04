import fs from "fs-extra";
import path from "path";

export interface CopyResult {
  success: boolean;
  copiedFiles: string[];
  errors: string[];
}

export async function copyResourceFiles(
  sourcePath: string = "resources",
  targetPath: string = process.cwd()
): Promise<CopyResult> {
  const result: CopyResult = {
    success: true,
    copiedFiles: [],
    errors: [],
  };

  try {
    // 소스 디렉토리 존재 확인
    if (!(await fs.pathExists(sourcePath))) {
      throw new Error(`소스 디렉토리가 존재하지 않습니다: ${sourcePath}`);
    }

    // 파일 복사 진행
    await fs.copy(sourcePath, targetPath, {
      overwrite: true,
      errorOnExist: false,
      filter: (src) => {
        const relativePath = path.relative(sourcePath, src);
        if (relativePath) {
          result.copiedFiles.push(relativePath);
        }
        return true;
      },
    });

    return result;
  } catch (error) {
    result.success = false;
    result.errors.push(
      error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다."
    );
    return result;
  }
}
