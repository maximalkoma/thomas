// Basic command structure, importing bot, message and the args
exports.run = async (bot, m, args) => {
  
  // Deletes the user's message
  m.delete()
  
  // Checks if the member is in a voice channel
  if(!m.member.voice.channel) return m.channel.send("Du befindest dich in keinem Sprachkanal.");
  
  // Checks if the bot is in a voice channel
  if(!m.guild.me.voice.channel) return m.channel.send("Ich bin in keinem Sprachkanal.");
  
  // Checks if the bot and the member are in the same voice channel
  if(m.guild.me.voice.channel.id !== m.member.voice.channel.id) return m.channel.send("Wir befinden uns nicht im selben Sprachkanal.");
  
  // Leaves the voice channel if all checks passes
  m.guild.me.voice.channel.leave();
  
  // Tells the member the bot left the voice channel
  m.channel.send("Sprachkanal wurde verlassen.");
}