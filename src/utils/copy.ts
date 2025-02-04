import fs from "fs-extra";
import path from "path";

export interface CopyResult {
  success: boolean;
  copiedFiles: string[];
  errors: string[];
}

export async function copyResourceFiles(
  targetPath: string = process.cwd()
): Promise<CopyResult> {
  const result: CopyResult = {
    success: true,
    copiedFiles: [],
    errors: [],
  };

  try {
    // dist/utils에서 dist/resources로 이동
    const sourcePath = path.resolve(__dirname, "../resources");

    // resources 디렉토리 존재 확인
    if (!(await fs.pathExists(sourcePath))) {
      throw new Error(
        `패키지의 resources 폴더를 찾을 수 없습니다: ${sourcePath}\n` +
          `패키지를 다시 설치하거나 resources 폴더가 포함된 버전으로 업데이트해주세요.`
      );
    }

    // resources 디렉토리 내의 파일/폴더 목록 가져오기
    const entries = await fs.readdir(sourcePath);

    // 각 파일/폴더를 대상 디렉토리로 복사
    for (const entry of entries) {
      const sourceFull = path.join(sourcePath, entry);
      const targetFull = path.join(targetPath, entry);

      await fs.copy(sourceFull, targetFull, {
        overwrite: true,
        errorOnExist: false,
      });
      result.copiedFiles.push(entry);
    }

    return result;
  } catch (error) {
    result.success = false;
    result.errors.push(
      error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다."
    );
    return result;
  }
}
