// Basic command structure, importing bot, message and the args
exports.run = async (bot, m, args, active) => {

  // Deletes the user's message
  m.delete()
  
  // Retrieves the server's music information
  let fetched = active.get(m.guild.id);
  
  // Checks if there is any music playing in the server
  if(!fetched) return m.channel.send("Es spielt gerade keine  Musik.");
  
  // Checks if the bot and the member are in the same voice channel
  if(m.guild.me.voice.channel !== m.member.voice.channel) return m.channel.send("Wir sind nicht im selben Sprachkanal.");
  
  // Skips to current playing song
  fetched.dispatcher.emit("skipped");
  
  // Tells the member the bot skipped the current song
  m.channel.send("Tippe %next ein, um das nächste Lied aus der Warteschlange abzuspielen.");
  
}