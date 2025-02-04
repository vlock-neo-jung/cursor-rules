#!/usr/bin/env node

import { Command } from "commander";
import { copyResourceFiles } from "../utils/copy";
import { createProgressBar, displayResults } from "../utils/progress";
import path from "path";

const program = new Command();

program
  .name("cursor-rules")
  .description(
    "resources 디렉토리의 파일들을 현재 작업 디렉토리로 복사하는 CLI 도구"
  )
  .version("1.0.0")
  .option("-s, --source <path>", "resources 디렉토리 경로", "resources")
  .option("-t, --target <path>", "대상 디렉토리 경로", process.cwd())
  .action(async (options) => {
    const sourcePath = path.resolve(options.source);
    const targetPath = path.resolve(options.target);

    console.log(`\n📂 파일 복사를 시작합니다...`);
    console.log(`소스 디렉토리: ${sourcePath}`);
    console.log(`대상 디렉토리: ${targetPath}\n`);

    const progressBar = createProgressBar();
    progressBar.start(100, 0);

    try {
      const result = await copyResourceFiles(sourcePath, targetPath);
      progressBar.update(100);
      progressBar.stop();
      displayResults(result);
    } catch (error) {
      progressBar.stop();
      console.error("\n❌ 예기치 않은 오류가 발생했습니다:", error);
      process.exit(1);
    }
  });

program.parse();
