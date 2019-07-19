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
  let {serv,view,mod} = require(configPath)
  let log = console.log
  try{
    //复制style.less
    log(chalk.green('copy style.less start'))
    fs.copyFileSync('../template/style.less',stylePath)
    log(chalk.green(`copy style.less to ${templateName}Style.less success`))
    
    //复制及修改serv.js文件
    chalk.green('read serv.js start')
    let servFileString = fs.readFileSync('../template/serv.js').toString()
    log(chalk.green(`read serv.js success,write ${templateName}Serv.js start`))
    const servData = {
      listUrl:serv.list.url,
      changeStatusUrl:serv.changeStatus.url,
      deleteUrl:serv.del.url
    }
    fs.writeFileSync(servPath,ejs.render(servFileString,servData))
    log(chalk.green(`write ${templateName}Serv.js success`))
  
    //复制及修改view.js文件
    chalk.green('read view.js start')
    let viewFileString = fs.readFileSync('../template/view.ejs').toString()
    log(chalk.green(`read view.js success,write ${templateName}View.js start`))
    const viewData = {
      name:templateName,
      ...view
    }
    fs.writeFileSync(viewPath,ejs.render(viewFileString,viewData))
    log(chalk.green(`write ${templateName}View.js success`))
  
    //mob.js文件
    chalk.green('read mod.js start')
    let modFileString = fs.readFileSync('../template/mod.js').toString()
    log(chalk.green(`read mod.js success,write ${templateName}Mod.js start`))
    const modData = {
      name:templateName,
      ...mod
    }
    fs.writeFileSync(modPath,ejs.render(modFileString,modData))
    log(chalk.green(`write ${templateName}Mod.js success`))
  }catch (e) {
    log(chalk.red('error occur',e))
  }
}
