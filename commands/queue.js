// MessageEmbed class extraction from the discord.js library/package
const { MessageEmbed } = require("discord.js");

// Basic command structure, importing bot, message and the args
exports.run = async (bot, message, args, active) => {

  // Deletes the user's message
  message.delete()

  // Retrieves the server's music information
  let fetched = active.get(message.guild.id);

  // Checks if there is any music playing in the server
  if(!fetched) return message.channel.send("Es spielt gerade keine Musik.");

  // Defines the queue
  let queue = fetched.queue;

  // Create an empty string for the queue song list
  let data = "";

  // Loop through the entire queue
  for (var i = 1; i < queue.length; i++) {

    //  Add each song to the list
    data += ${i}. **${queue[i].songTitle}** - ${queue[i].duration} -- **𝚁𝚎𝚚𝚞𝚎𝚜𝚝𝚎𝚍 𝚋𝚢:** *${queue[i].requestor}*\n;

  }

  // If there are no songs in the queue, tell the member that the queue is empty
  if (data.length < 1) data = "Es befinden sich keine Lieder in der Wartelistze.";

  // Sends the queue
  message.channel.send(
    new MessageEmbed()
      .setTitle("Warteliste:")
      .setThumbnail(queue[0].thumbnail)
      .addField("Spielt gerade:", queue[0].songTitle, true)
      .addField("Dauer:", queue[0].duration, true)
      .addField("Eingereicht von:", queue[0].requestor, true)
      .addField("Warteliste:", data)
      .setColor("#2ECC71")
    );

};