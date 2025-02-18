import path from "path";
import os from "os";

/**
 * 글로벌 Cursor 설정 디렉토리 경로를 반환
 */
export function getCursorGlobalDir(): string {
  return path.join(os.homedir(), ".cursor");
}

/**
 * 글로벌 Cursor 규칙 디렉토리 경로를 반환
 */
export function getCursorRulesDir(): string {
  return path.join(getCursorGlobalDir(), "rules");
}

/**
 * 현재 디렉토리의 .cursor/rules 경로를 반환
 */
export function getLocalRulesDir(): string {
  return path.join(process.cwd(), ".cursor", "rules");
}

/**
 * 현재 디렉토리의 .cursorrules 파일 경로를 반환
 */
export function getLocalRulesFile(): string {
  return path.join(process.cwd(), ".cursorrules");
}

/**
 * 글로벌 .cursorrules 파일 경로를 반환
 */
export function getGlobalRulesFile(): string {
  return path.join(getCursorGlobalDir(), ".cursorrules");
}
