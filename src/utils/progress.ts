import cliProgress from "cli-progress";
import { CopyResult } from "./copy";

export function createProgressBar(): cliProgress.SingleBar {
  return new cliProgress.SingleBar({
    format: "복사 진행률 |{bar}| {percentage}% || {value}/{total} 파일",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
  });
}

export function displayResults(result: CopyResult): void {
  if (result.success) {
    console.log("\n✅ 파일 복사가 완료되었습니다.");
    console.log("\n복사된 파일 목록:");
    result.copiedFiles.forEach((file) => console.log(`  - ${file}`));
  } else {
    console.error("\n❌ 파일 복사 중 오류가 발생했습니다:");
    result.errors.forEach((error) => console.error(`  - ${error}`));
  }
}
