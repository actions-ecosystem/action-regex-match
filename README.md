# Action Regex Match

[![actions-workflow-lint][actions-workflow-lint-badge]][actions-workflow-lint]
[![release][release-badge]][release]
[![license][license-badge]][license]

This is a GitHub Action to do regex matching and report whether the input text match the regex as an output.

GitHub Actions natively supports some helpful functions, like `contains` and `startsWith`, but doesn't regex matching.
This actions provides the missing, useful function.

It would be more useful to use this with other GitHub Actions' outputs.

## Inputs

|  NAME   |               DESCRIPTION                |   TYPE   | REQUIRED | DEFAULT |
| ------- | ---------------------------------------- | -------- | -------- | ------- |
| `text`  | A text as the target for `inputs.regex`. | `string` | `true`   | `N/A`   |
| `regex` | An extended regex for `inputs.text`.     | `string` | `true`   | `N/A`   |

## Outputs

|  NAME   |                                     DESCRIPTION                                      |  TYPE  |
| ------- | ------------------------------------------------------------------------------------ | ------ |
| `match` | Whether `inputs.regex` matches `inputs.text`. The value is either 'true' or 'false'. | `bool` |

## Example

```yaml
name: Create Comment with Regex Match

on: [issue_comment]

jobs:
  create_comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions-ecosystem/action-regex-match@v1
        id: regex-match
        with:
            text: ${{ github.event.comment.body }}
            regex: '^/[Hh]ello'
      - uses: actions-ecosystem/action-regex-match@v1
        if: ${{ steps.regex-match.outputs.match == 'true' }}
        with:
          github_token: ${{ secrets.github_token }}
          body: |
            Hello, @${{ github.actor }}!
```

## License

Copyright 2020 The Actions Ecosystem Authors.

Action Regex Match is released under the [Apache License 2.0](./LICENSE).

<!-- badge links -->

[actions-workflow-lint]: https://github.com/actions-ecosystem/action-regex-match/actions?query=workflow%3ALint
[actions-workflow-lint-badge]: https://img.shields.io/github/workflow/status/actions-ecosystem/action-regex-match/Lint?label=Lint&style=for-the-badge&logo=github

[release]: https://github.com/actions-ecosystem/action-regex-match/releases
[release-badge]: https://img.shields.io/github/v/release/actions-ecosystem/action-regex-match?style=for-the-badge&logo=github

[license]: LICENSE
[license-badge]: https://img.shields.io/github/license/actions-ecosystem/action-add-labels?style=for-the-badge
