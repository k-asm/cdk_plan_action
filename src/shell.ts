import {spawnSync} from 'child_process';
import * as core from '@actions/core';

export interface ShellResult {
  code: number;
  stdout: string;
  stderr: string;
}

export const sh = (cmd: string): ShellResult => {
  core.startGroup(`$ ${cmd}`);
  const process = spawnSync(cmd, {
    maxBuffer: 1000 * 1000 * 1000,
    shell: true
  });
  core.info(process.stdout.toString());
  if (process.stderr.length) core.warning(process.stderr.toString());
  core.endGroup();

  return {
    code: process.status ?? 0,
    stderr: process.stderr.toString(),
    stdout: process.stdout.toString()
  };
};