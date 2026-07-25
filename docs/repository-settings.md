# Repository settings

The generated files provide repository-side policy, but GitHub settings still need an administrator to enable them after the first push.

Recommended baseline:

1. Keep the repository as an ordinary repository rather than a GitHub template.
2. Allow squash merging only, enable auto-merge, and delete head branches after merge.
3. Protect `main` with pull-request-only changes, required conversation resolution, and the checks that have completed successfully at least once.
4. Enable private vulnerability reporting, Dependabot alerts, and automated security fixes.
5. Install and enable Renovate for `astilbahq/ui`; the checked-in configuration does nothing until the GitHub App can access the repository.
6. Keep the default workflow token read-only unless an individual workflow declares a narrower write permission.

CodeQL and dependency review run only when the repository is public, avoiding an accidental GitHub Advanced Security dependency for private repositories.
