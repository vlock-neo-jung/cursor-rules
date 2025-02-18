import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { CopyError, CopyResult, PermissionError } from "../types";

/**
 * 파일이나 디렉토리가 존재하는지 확인
 */
export async function exists(filePath: string): Promise<boolean> {
  return await fs.pathExists(filePath);
}

/**
 * 파일 접근 권한 확인
 * @throws {PermissionError} 권한이 없는 경우
 */
export async function checkAccess(
  filePath: string,
  operation: "read" | "write"
): Promise<void> {
  try {
    if (operation === "read") {
      await fs.access(filePath, fs.constants.R_OK);
    } else {
      // 파일이 존재하면 쓰기 권한 확인
      if (await exists(filePath)) {
        await fs.access(filePath, fs.constants.W_OK);
      }
      // 파일이 없으면 디렉토리 쓰기 권한 확인
      else {
        await fs.access(path.dirname(filePath), fs.constants.W_OK);
      }
    }
  } catch (error) {
    throw new PermissionError(filePath, operation, error as Error);
  }
}

/**
 * 디렉토리 생성 (존재하지 않는 경우)
 * @throws {PermissionError} 권한이 없는 경우
 */
export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.ensureDir(dirPath);
  } catch (error) {
    throw new PermissionError(dirPath, "write", error as Error);
  }
}

/**
 * 파일 복사 전 사용자 확인
 * @returns 복사 진행 여부
 */
export async function confirmOverwrite(targetPath: string): Promise<boolean> {
  if (!(await exists(targetPath))) {
    return true;
  }

  const { overwrite } = await inquirer.prompt([
    {
      type: "confirm",
      name: "overwrite",
      message: `${path.basename(
        targetPath
      )} 파일이 이미 존재합니다. 덮어쓰시겠습니까?`,
      default: false,
    },
  ]);

  return overwrite;
}

/**
 * 파일 복사 (디렉토리 자동 생성)
 * @throws {CopyError} 파일 복사 실패 시
 * @throws {PermissionError} 권한이 없는 경우
 */
export async function copyFile(
  sourcePath: string,
  targetPath: string,
  force = false
): Promise<boolean> {
  try {
    // 소스 파일이 없으면 복사하지 않음
    if (!(await exists(sourcePath))) {
      throw new CopyError(sourcePath, "소스 파일이 존재하지 않습니다.");
    }

    // 권한 확인
    await checkAccess(sourcePath, "read");
    await checkAccess(targetPath, "write");

    // 강제 복사가 아니면 사용자 확인
    if (!force && !(await confirmOverwrite(targetPath))) {
      return false;
    }

    // 대상 디렉토리 생성
    await ensureDir(path.dirname(targetPath));

    // 파일 복사
    await fs.copy(sourcePath, targetPath, { overwrite: true });
    return true;
  } catch (error) {
    if (error instanceof PermissionError || error instanceof CopyError) {
      throw error;
    }
    throw new CopyError(
      sourcePath,
      "예기치 않은 오류가 발생했습니다.",
      error as Error
    );
  }
}

/**
 * 디렉토리 내 모든 파일 복사
 */
export async function copyDir(
  sourceDir: string,
  targetDir: string,
  force = false
): Promise<CopyResult> {
  const result: CopyResult = {
    success: true,
    copied: [],
    skipped: [],
    errors: [],
  };

  try {
    // 소스 디렉토리가 없으면 복사하지 않음
    if (!(await exists(sourceDir))) {
      throw new CopyError(sourceDir, "소스 디렉토리가 존재하지 않습니다.");
    }

    // 권한 확인
    await checkAccess(sourceDir, "read");
    await checkAccess(targetDir, "write");

    // 모든 파일 목록 가져오기
    const files = await fs.readdir(sourceDir);

    // 각 파일 복사
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      try {
        const copied = await copyFile(sourcePath, targetPath, force);
        if (copied) {
          result.copied.push(file);
        } else {
          result.skipped.push(file);
        }
      } catch (error) {
        result.success = false;
        result.errors.push({
          file,
          error: error instanceof Error ? error.message : "알 수 없는 오류",
        });
      }
    }

    return result;
  } catch (error) {
    if (error instanceof PermissionError || error instanceof CopyError) {
      throw error;
    }
    throw new CopyError(
      sourceDir,
      "예기치 않은 오류가 발생했습니다.",
      error as Error
    );
  }
}
