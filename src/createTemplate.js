const commander = require('commander')
const packageJson = require('../package.json');
const fs=require('fs');//引入fs模块
const path = require('path')


commander
  .version(packageJson.version,'-v, --version')
  .option('-t, --template <name>', 'gennerate template file');
commander.parse(process.argv);

if (commander.template){
  let templateName = commander.template
  const currentPath = process.cwd();
  const fPath = path.resolve(currentPath, `${templateName}Style.less`);
  console.log(fPath)
  fs.copyFile('../template/style.less',fPath,function (err) {
    console.log(err)
  })
}
