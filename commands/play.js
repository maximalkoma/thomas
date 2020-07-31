// ytdl function definition the ytdl-core library/package
const ytdl = require("ytdl-core");

// MessageEmbed class extraction from the discord.js library/package
const {MessageEmbed} = require("discord.js");

// Define the time calculating function
const time = (x) => Math.floor(x / 60) + ':' + ('0' + Math.floor(x % 60)).slice(-2);

// Basic command structure, importing bot, message, args and active
exports.run = async (bot, message, args, active) => {
  
  // Checks if the member is in a voice channel
  if(!message.member.voice.channel) return message.channel.send("Du bist in keinem Sprachkanal.");
  
  // Checks if the member entered a valid YT URL or a search query
  if(!args[0]) return message.channel.send('Gib bitte eine Youtube-URL an.');
  
  // Runs the YT-Search Module if the entered string isnt a valid YT URL
  if(!await ytdl.validateURL(args[0])) return require(`./ytsearch.js`).run(bot, message, args, active);
  
  // Retrieve the info of the video
  let {title, length_seconds} = await ytdl.getInfo(args[0]);

  // Gets the data of the server
  let data = active.get(message.guild.id) || {}
  
  // Check/Make a connection to the voice channel
  if(!data.connections) data.connection = await message.member.voice.channel.join()
  
  // Check/Make a queue for the server
  if(!data.queue) data.queue = []
  
  // Add the server id to the data object
  data.guildId = message.guild.id
  
  // Create basic queue data
  data.queue.push({
    songTitle: title,
    reqTag: message.author.tag,
    reqAvatar: message.author.displayAvatarURL,
    url: args[0],
    duration: time(length_seconds),
    thumbnail: `http://img.youtube.com/vi/${ytdl.getVideoID(args[0])}/hqdefault.jpg`,
    ch: message.channel.id
  })
  
  // If no song is currently playing
  if(!data.dispatcher) {
    
    // Play the song
    play(bot, active, data);
  
    
    // Delete the user's message
    message.delete();
    
  }
  
  // Otherwise add it to the queue
  else {
    
    // Tell the user the song has been added to the queue
    message.channel.send(
      new MessageEmbed()
        .setTitle("Der Song wurde zur Warteliste hinzugefügt.")
        .addField('Titel:', title)
        .addField("Dauer:", time(length_seconds))
        .addField('𝚄𝚁𝙻:', data.queue[0].url)
        .setFooter(`𝚁𝚎𝚚𝚞𝚎𝚜𝚝𝚎𝚍 𝚋𝚢: ${data.queue[0].reqTag}`, data.queue[0].reqAvatar)
        .setThumbnail(`http://img.youtube.com/vi/${ytdl.getVideoID(args[0])}/hqdefault.jpg`)
        .setTimestamp()
        .setColor('#2ECC71')
    )
    
    // Delete the user's message
    message.delete();
    
  }
  
  // Update the data for the current server
  active.set(message.guild.id, data)
  
}

// Define the function that actually plays the songs
async function play(bot, active, data) {
  
  // Tell the user the bot is starting to play the song
  bot.channels.cache.get(data.queue[0].ch).send(
    new MessageEmbed()
      .setTitle("Spielt jetzt:")
      .addField('Titel:', data.queue[0].songTitle)
      .addField("𝙳auer:", data.queue[0].duration)
      .addField('𝚄𝚁𝙻:', data.queue[0].url)
      .setFooter(`𝚁𝚎𝚚𝚞𝚎𝚜𝚝𝚎𝚍 𝚋𝚢: ${data.queue[0].reqTag}`, data.queue[0].reqAvatar)
      .setThumbnail(data.queue[0].thumbnail)
      .setTimestamp()
      .setColor('#2ECC71')
  )
  
  // Play the song
  data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}))
  
  // Once the song is finished play the next on in queue or leave the voice channel
  data.dispatcher.once('skipped', async () => {
    
    // Retrieves the server's music information
    let fetched = active.get(data.guildId)
    
    // Removes the finished song from the queue array
    fetched.queue.shift()
    
    // If there are songs left in the queue, play the next song in queue
    if(fetched.queue.length > 0){
      
      // Overwrite the old guild data with the new one
      active.set(data.guildId, fetched)
      
      // Play next song using updated server information
      play(bot, active, fetched) 
      
    } 
    
    // Otherwise delete the data and leave the voice channel
    else {
      
      // Delete the guild's data
      active.delete(data.guildId)
      
      // Leave the voice channel 
      bot.guilds.cache.get(data.guildId).me.voice.channel.leave()
      
    }
      
  })
  
}