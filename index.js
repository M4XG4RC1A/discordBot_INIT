const Discord = require('discord.js');
const client = new Discord.Client();
const token = "ODU5OTUzMzI5Nzk1MTA0NzY4.YN0L8g.fszIi_EwHkV0Ig8A-1R0XHQ8ztw"
const prefix = "/";

const Database = require("@replit/database");
const db = new Database();

db.list().then(keys => {
  console.log(keys);
  if(!keys.length){
    require('./createDB.js');
  }
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith("Hola")) {
    msg.reply('pong');
  }
});

client.on('message', msg => {
  if(msg.content.toUpperCase().startsWith(prefix+"HELP") || msg.content.toUpperCase().startsWith(prefix+"H")){
    msg.reply("You can use: ");
    msg.reply(prefix+"WebPage [WebPage Name]");
    msg.reply(prefix+"Add [WebsiteName] [WebsiteLink]");
    msg.reply(prefix+"Webs");
  }
});

client.on('message', msg => {
  if (msg.content.toUpperCase().startsWith(prefix+"WEBPAGE") || msg.content.toUpperCase().startsWith(prefix+"WP")) {
    arr = msg.content.split(" ");
    if(!arr.length || arr.length==1 || arr.length>2){
      msg.reply("Remember to use "+prefix+"WebPage [WebPage Name]")
    }else{
      try{
        db.get(arr[1].toUpperCase()).then(web=>{
          if(web==null){
            msg.reply("No Website Found Try Add with "+prefix+"Add [WebsiteName] [WebsiteLink]")
          }else{
            msg.reply("Website: "+web);
          }
        })
      }catch(e){
        msg.reply("No Website Found Try Add with "+prefix+"Add [WebsiteName] [WebsiteLink]")
      }
    }
  }else if (msg.content.toUpperCase().startsWith(prefix+"WEBS") || msg.content.toUpperCase().startsWith(prefix+"W")) {
    arr = msg.content.split(" ");
    if(!arr.length || arr.length>1){
      msg.reply("Remember to use "+prefix+"Webs")
    }else{
      db.list().then(keys=>{
        msg.reply("Pages: ")
        msg.reply(keys.join(', '));
      })
    }
  }
});

client.on('message', msg => {
  if (msg.content.toUpperCase().startsWith(prefix+"ADD") || msg.content.toUpperCase().startsWith(prefix+"A")) {
    arr = msg.content.split(" ");
    if(!arr.length || arr.length<3 || arr.length>3){
      msg.reply("Remember to use "+prefix+"Add [WebPage Name] [WebsiteLink]")
    }else{
      try{
        db.set(arr[1].toUpperCase(),arr[2]).then(()=>{
          msg.reply(arr[1]+" Added");
        })
      }catch(e){
        msg.reply("Error Check Command")
      }
    }
  }
});

client.login(token);