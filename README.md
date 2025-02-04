# cursor-rules

현재 디렉토리의 `resources` 폴더에서 파일들을 복사하는 CLI 도구입니다.

## 설치 방법

```bash
# npx로 직접 실행
npx cursor-rules

# 또는 전역 설치
npm install -g cursor-rules
```

## 사용 방법

1. 기본 사용 (현재 디렉토리로 복사)

```bash
cursor-rules
```

2. 대상 디렉토리 지정

```bash
cursor-rules -t ./target-directory
```

## 옵션

- `-t, --target <path>`: 파일을 복사할 대상 디렉토리 경로 (기본값: 현재 디렉토리)
- `-V, --version`: 버전 정보 출력
- `-h, --help`: 도움말 출력

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
pnpm start
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
