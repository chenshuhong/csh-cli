const commander = require('commander')
const chalk = require('chalk').default;
const ejs = require('ejs');
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
  let {serv} = require(configPath)
  let log = console.log
  try{
    log(chalk.green('copy style.less start'))
    fs.copyFileSync('../template/style.less',stylePath)
    log(chalk.green('copy style.less success'))
    chalk.green('read serv.js start')
    let servEjs = fs.readFileSync('../template/serv.ejs').toString()
    log(chalk.green('read serv.js success,write *Serv.js start'))
    const servData = {
      listUrl:serv.list.url,
      changeStatusUrl:serv.changeStatus.url,
      deleteUrl:serv.del.url
    }
    fs.writeFileSync(servPath,ejs.render(servEjs,servData))
    log(chalk.green('write *Serv.js success'))
  }catch (e) {
    log(chalk.red('error occur',e))
  }
}
