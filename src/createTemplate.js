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
  const stylePath = path.resolve(currentPath, `${templateName}Style.less`);
  const servPath = path.resolve(currentPath, `${templateName}Serv.js`);
  const viewPath = path.resolve(currentPath, `${templateName}View.js`);
  const modPath = path.resolve(currentPath, `${templateName}Mod.js`);
  const configPath = path.resolve(currentPath, `config.js`);
  let config = require(configPath)
  try{
    fs.copyFileSync('../template/style.less',stylePath)
    fs.copyFileSync('../template/serv.js',servPath)
  }catch (e) {
    console.log(e)
  }
}
