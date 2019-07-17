#!/usr/bin/env node

var chalk = require('chalk').default;

var currentNodeVersion = process.versions.node;
var semer = currentNodeVersion.split('.');
var major = semer[0];

if (major>8){
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


