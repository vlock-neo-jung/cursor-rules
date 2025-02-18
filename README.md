# cursor-rules

Cursor 규칙 파일들을 글로벌 설정과 동기화하는 CLI 도구입니다.

## 설치 방법

```bash
# npm으로 글로벌 설치
npm install -g cursor-rules

# 또는 pnpm으로 글로벌 설치
pnpm add -g cursor-rules

# 또는 npx로 직접 실행
npx cursor-rules
```

## 사용 방법

1. 현재 디렉토리의 규칙을 글로벌 설정으로 복사 (push)

```bash
cursor-rules push
```

2. 글로벌 설정의 규칙을 현재 디렉토리로 복사 (pull)

```bash
cursor-rules pull
```

## 옵션

- `-f, --force`: 파일이 이미 존재할 때 확인 없이 덮어쓰기
- `-V, --version`: 버전 정보 출력
- `-h, --help`: 도움말 출력

예시:

```bash
# 확인 없이 강제로 push
cursor-rules push --force

# 확인 없이 강제로 pull (단축 옵션)
cursor-rules pull -f

# push 명령어 도움말
cursor-rules push --help
```

## 동기화되는 파일

- `.cursorrules`: 프로젝트 루트의 규칙 파일
- `.cursor/rules/*`: 규칙 관련 모든 파일

## 개발 환경 설정

1. 저장소 클론

```bash
git clone [저장소 URL]
cd cursor-rules
```

2. 의존성 설치

```bash
pnpm install
```

3. 개발 모드 실행

```bash
# push 명령어 실행
pnpm start push

# pull 명령어 실행
pnpm start pull
```

4. 빌드

```bash
pnpm build
```

## 배포 방법

1. 의존성 설치

```bash
pnpm install
```

2. 빌드

```bash
pnpm build
```

3. 로그인 (처음 배포하는 경우)

```bash
npm login
```

4. 배포

```bash
npm publish
```

## 라이센스

ISC
