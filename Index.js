// Client class extraction from the discord.js library/package
const {Client} = require("discord.js");

// Initialization of the bot variable using a new Client
const bot = new Client();

// Logging into the bot account using it's token
bot.login(process.env.Bot_Token)

// ExistsSync function extraction from the fs library/package
const {existsSync} = require("fs")

// Creates a new Map to store music data in
const active = new Map()

// The event that fires when the bot first starts
bot.on("ready", async () => {
  
  // Sets the bot's status
  bot.user.setPresence({activity: {name: `${process.env.Bot_Prefix}𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘴`, type: "LISTENING"}})
  
  // Logs to the console that the bot is online
  console.log(`[${bot.user.tag} Is Online Since] => [${new Date(Date.now()).toUTCString()}]`);

})

// The event that fires when the bot recieves a message
bot.on("message", async message => {
  
    // Checks if the author isn't a bot
    if(message.author.bot) return
    
    // Checks if the message starts with the prefix
    if(!message.content.startsWith(process.env.Bot_Prefix)) return
    
    // Checks if the command is run in a server
    if(message.channel.type != "text") return message.reply("Du kannst Commands nur auf Servern benutzen")
  
    // Defines the arguments in the command  
    let args = message.content.slice(process.env.Bot_Prefix.length).trim().split(/ +/g)
    
    // Defines the path to the command
    let path = `./commands/${args.shift().toLowerCase()}.js`

    // Checks if the command exists
    if(!existsSync(path)) return

    // Defines the command if it exists
    const command = require(path)

    // Runs the command with the variables: bot, message, args & active
    command.run(bot, message, args, active)
})


// Simple webserver that redirects you to the bot invite page
require("express")()
  .use("/", async (q, r)  => r.redirect(await bot.generateInvite()))
  .listen(1234)

// Function that pings the site so that it stays online
let Ping = () => require("https").get('https://${process.env.PROJECT_DOMAIN}.glitch.me/')
