import { CopyResult } from "../types";
import { copyDir, copyFile } from "./file";
import {
  getCursorGlobalDir,
  getCursorRulesDir,
  getGlobalRulesFile,
  getLocalRulesDir,
  getLocalRulesFile,
} from "./path";

/**
 * 현재 디렉토리의 규칙을 글로벌 설정으로 복사 (push)
 */
export async function pushRules(force = false): Promise<CopyResult> {
  const result: CopyResult = {
    success: true,
    copied: [],
    skipped: [],
    errors: [],
  };

  // .cursorrules 파일 복사
  try {
    const copied = await copyFile(
      getLocalRulesFile(),
      getGlobalRulesFile(),
      force
    );
    if (copied) {
      result.copied.push(".cursorrules");
    } else {
      result.skipped.push(".cursorrules");
    }
  } catch (error) {
    result.success = false;
    result.errors.push({
      file: ".cursorrules",
      error: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }

  // .cursor/rules 디렉토리 복사
  try {
    const dirResult = await copyDir(
      getLocalRulesDir(),
      getCursorRulesDir(),
      force
    );
    result.copied.push(...dirResult.copied);
    result.skipped.push(...dirResult.skipped);
    result.errors.push(...dirResult.errors);
    if (!dirResult.success) {
      result.success = false;
    }
  } catch (error) {
    result.success = false;
    result.errors.push({
      file: ".cursor/rules",
      error: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }

  return result;
}

/**
 * 글로벌 설정의 규칙을 현재 디렉토리로 복사 (pull)
 */
export async function pullRules(force = false): Promise<CopyResult> {
  const result: CopyResult = {
    success: true,
    copied: [],
    skipped: [],
    errors: [],
  };

  // .cursorrules 파일 복사
  try {
    const copied = await copyFile(
      getGlobalRulesFile(),
      getLocalRulesFile(),
      force
    );
    if (copied) {
      result.copied.push(".cursorrules");
    } else {
      result.skipped.push(".cursorrules");
    }
  } catch (error) {
    result.success = false;
    result.errors.push({
      file: ".cursorrules",
      error: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }

  // .cursor/rules 디렉토리 복사
  try {
    const dirResult = await copyDir(
      getCursorRulesDir(),
      getLocalRulesDir(),
      force
    );
    result.copied.push(...dirResult.copied);
    result.skipped.push(...dirResult.skipped);
    result.errors.push(...dirResult.errors);
    if (!dirResult.success) {
      result.success = false;
    }
  } catch (error) {
    result.success = false;
    result.errors.push({
      file: ".cursor/rules",
      error: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }

  return result;
}
