#!/usr/bin/env node

import { Command } from "commander";
import { pullRules, pushRules } from "../utils/sync";
import { CopyResult } from "../types";

const program = new Command();

/**
 * 복사 결과 출력
 */
function displayResult(result: CopyResult): void {
  if (result.copied.length > 0) {
    console.log("\n✅ 복사된 파일:");
    result.copied.forEach((file) => console.log(`  - ${file}`));
  }

  if (result.skipped.length > 0) {
    console.log("\n⏭️  건너뛴 파일:");
    result.skipped.forEach((file) => console.log(`  - ${file}`));
  }

  if (result.errors.length > 0) {
    console.log("\n❌ 오류 발생:");
    result.errors.forEach(({ file, error }) =>
      console.log(`  - ${file}: ${error}`)
    );
  }

  if (!result.success) {
    process.exit(1);
  }
}

program
  .name("cursor-rules")
  .description("Cursor 규칙 파일들을 글로벌 설정과 동기화하는 CLI 도구")
  .version("1.0.7");

program
  .command("push")
  .description("현재 디렉토리의 규칙을 글로벌 설정으로 복사")
  .option("-f, --force", "확인 없이 덮어쓰기", false)
  .action(async (options) => {
    try {
      const result = await pushRules(options.force);
      displayResult(result);
    } catch (error) {
      console.error(
        "\n❌ 오류:",
        error instanceof Error ? error.message : error
      );
      process.exit(1);
    }
  });

program
  .command("pull")
  .description("글로벌 설정의 규칙을 현재 디렉토리로 복사")
  .option("-f, --force", "확인 없이 덮어쓰기", false)
  .action(async (options) => {
    try {
      const result = await pullRules(options.force);
      displayResult(result);
    } catch (error) {
      console.error(
        "\n❌ 오류:",
        error instanceof Error ? error.message : error
      );
      process.exit(1);
    }
  });

program.parse();
