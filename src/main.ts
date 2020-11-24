import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const text = core.getInput('text');
    const regex = core.getInput('regex');
    const flags = core.getInput('flags');

    const re = new RegExp(regex, flags);

    const result = re.exec(text);

    if (result) {
      result.forEach((value, index) => {
        if (index >= 10) {
          return;
        }

        if (index === 0) {
          core.setOutput('match', value);
          return;
        }

        core.setOutput(`group${index}`, value);
      });
    }
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run();
