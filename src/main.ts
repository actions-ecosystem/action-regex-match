import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const text = core.getInput('text');
    const regex = core.getInput('regex');
    const flags = core.getInput('flags');

    const re = new RegExp(regex, flags);

    const result = re.exec(text);

    if (result) {
      for (const x of result) {
        const index = result.indexOf(x);

        if (index === 10) {
          return;
        }

        if (index === 0) {
          core.setOutput('match', x);
          continue;
        }

        core.setOutput(`group${index}`, x);
      }
    }
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run();
