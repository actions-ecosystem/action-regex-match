# Action Regex Match

[![actions-workflow-test][actions-workflow-test-badge]][actions-workflow-test]
[![release][release-badge]][release]
[![license][license-badge]][license]

This is a GitHub Action to do regex matching and output the matched text and groups captured by the given regex.

GitHub Actions natively supports some helpful functions, like `contains` and `startsWith`, but doesn't regex matching.
This actions provides the missing, useful function.

It would be more useful to use this with other GitHub Actions' outputs.

## Inputs

|  NAME   |                      DESCRIPTION                      |   TYPE   | REQUIRED | DEFAULT |
| ------- | ----------------------------------------------------- | -------- | -------- | ------- |
| `text`  | A text as the target for `inputs.regex`.              | `string` | `true`   | `N/A`   |
| `regex` | A regex for `inputs.text`. Supports capturing groups. | `string` | `true`   | `N/A`   |
| `flags` | Flags for inputs.regex. e.g.) `'g'`, `'gm'`           | `string` | `false`  | `''`    |

## Outputs

|   NAME   |                                         DESCRIPTION                                         |   TYPE   |
|----------|---------------------------------------------------------------------------------------------|----------|
| `match`  | The whole matched text. If the input.regex doesn't match input.text, outputs.matched is ''. | `string` |
| `group1` | The 1st captured group.                                                                     | `string` |
| `group2` | The 2nd captured group.                                                                     | `string` |
| `group3` | The 3rd captured group.                                                                     | `string` |
| `group4` | The 4th captured group.                                                                     | `string` |
| `group5` | The 5th captured group.                                                                     | `string` |
| `group6` | The 6th captured group.                                                                     | `string` |
| `group7` | The 7th captured group.                                                                     | `string` |
| `group8` | The 8th captured group.                                                                     | `string` |
| `group9` | The 9th captured group.                                                                     | `string` |

## Example

```yaml
name: Create Comment with Regex Match

on: [issue_comment]

jobs:
  create_comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions-ecosystem/action-regex-match@v2
        id: regex-match
        with:
          text: ${{ github.event.comment.body }}
          regex: '```typescript([\s\S]*)```'
          flags: gm
      - uses: ./.github/actions/action-create-comment
        if: ${{ steps.regex-match.outputs.match != '' }}
        with:
          github_token: ${{ secrets.github_token }}
          body: |
            Hello, @${{ github.actor }}!

            The raw TypeScript code is here.

            ---

            ${{ steps.regex-match.outputs.group1 }}

            ---
```

## License

Copyright 2020 The Actions Ecosystem Authors.

Action Regex Match is released under the [Apache License 2.0](./LICENSE).

<!-- badge links -->

[actions-workflow-test]: https://github.com/actions-ecosystem/action-regex-match/actions?query=workflow%3ATest
[actions-workflow-test-badge]: https://img.shields.io/github/workflow/status/actions-ecosystem/action-regex-match/Test?label=Test&style=for-the-badge&logo=github

[release]: https://github.com/actions-ecosystem/action-regex-match/releases
[release-badge]: https://img.shields.io/github/v/release/actions-ecosystem/action-regex-match?style=for-the-badge&logo=github

[license]: LICENSE
[license-badge]: https://img.shields.io/github/license/actions-ecosystem/action-add-labels?style=for-the-badge
