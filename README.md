# devops-kt3

Node.js Express application with GitHub Actions CI/CD and GHCR Docker images.

## Routes
- GET / — `KT3 App` (plain text)
- GET /health — `{"status":"ok"}` (JSON)

## Local usage
```bash
npm install
npm run lint
npm test
npm start
```
Visit http://localhost:3000/health.

## Docker
```bash
docker build -t devops-kt3 .
docker run --rm -p 3000:3000 devops-kt3
```

## Workflow
- `lint`: Node.js 20, ESLint.
- `test`: depends on lint, PostgreSQL 16-alpine service with health check, Jest tests.
- `build-and-push`: depends on test, runs only after push to main, pushes `ghcr.io/mrdisa/devops-kt3:latest` and SHA tag.

Workflow generates a lockfile before `npm ci` if it is not committed. For reproducible installs, commit `package-lock.json` after a local `npm install`.

## Branch and PR flow
`feature/kt3` → `develop` → `main`. Configure main branch protection to require status checks `lint` and `test`.

## Failure demonstration
Create `feature/broken-test` from `develop`, deliberately change an expected value in the Jest test, and open a PR into `develop`. The test check should fail, while `build-and-push` is skipped. Keep this PR unmerged, and screenshot the failed Actions run.
