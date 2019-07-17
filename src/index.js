#!/usr/bin/env node

const chalk = require('chalk').default;

const currentNodeVersion = process.versions.node;
const semer = currentNodeVersion.split('.');
const major = semer[0];

if (major<8){
  console.error(
    chalk.red(
      'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'requires Node 8 or higher. \n' +
      'Please update your version of Node.'
    )
  );
  process.exit(1);
}

console.log(
  chalk.green(
    'Judge Node version ojbk!'
  )
);

require('./createApp')


