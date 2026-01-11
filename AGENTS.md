# rules & best practices (v2.0)

## [critical] structural constraints
- **file length:** max 200 lines. stop and propose refactor if exceeded.
- **atomic commits:** one logical change per commit. strictly avoid mega-commits (>5 files). each commit must represent a single, complete feature or fix.
- **solid:** strictly follow single responsibility and dependency inversion.
- **environment awareness:** detect os; use powershell for windows and bash for unix.

## [mandatory] workflow
- **state check:** always read context.md and rules.md at session start.
- **tdd:** unit tests required for new functions (>80% coverage).
- **documentation:** sync architecture.md with structural changes.

## [git & deployment]
- **commit format:** use conventional commits -> <type>: <description>.
- **commit style:** lowercase description, present tense, no period at the end.
- **safety:** ensure .md files (except readme) are in .gitignore.

## [hygiene]
- **persistence:** update log.md with compliance column (pass/fail + reason).