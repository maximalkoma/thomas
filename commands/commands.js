// MessageEmbed class extraction from the discord.js library/package
const {MessageEmbed} = require("discord.js");

// Basic command structure, importing bot, message and the args
exports.run = async (bot, message, args) => {
  
  // Send the commands list
  message.channel.send(
    new MessageEmbed()
      .setTitle("𝐁𝐞𝐟𝐞𝐡𝐥𝐬 𝐋𝐢𝐬𝐭𝐞")
      .setDescription(`𝐃𝐞𝐫 𝐌𝐮𝐬𝐢𝐤𝐛𝐨𝐭 𝐯𝐨𝐧 𝐃𝐉 𝐊𝐨𝐦𝐚𝐤𝐚𝐬𝐩𝐞𝐫!\n[Lade ihn jetzt mit diesem Link auch auf deinen Server ein!](${await bot.generateInvite(8)})`)
      .addField("𝐩𝐥𝐚𝐲", "Spielt einen Song ab oder Gliedert ihn gegebenenfalls in die Warteliste ein.\n*Befehl:  \`𝚙𝚕𝚊𝚢 (𝚈𝚘𝚞𝚝𝚞𝚋𝚎 𝚄𝚁𝙻/𝚅𝚒𝚍𝚎𝚘 𝚃𝚒𝚝el)\`*")
      .addField("𝐬𝐤𝐢𝐩", "𝚂𝚔𝚒𝚙t den gerade spielenden Song.\n*Befehl:  \`𝚜𝚔𝚒𝚙\`*")
      .addField("𝐧𝐞𝐱𝐭", "Ist dazu da, den nächsten Song abspielen zu lassen.\n*Befehl:  \`next\`*")
      .addField("𝐪𝐮𝐞𝐮𝐞", "Zeigt alle Lieder an, die sich in der Warteliste befinden.\n*Befehl:  \`𝚚𝚞𝚎𝚞𝚎\`*")
      .addField("𝐥𝐞𝐚𝐯𝐞", "Löscht die Warteliste und Verlässt den Sprachkanal.\n*Befehl:  \`𝚕𝚎𝚊𝚟𝚎\`*")
      .setColor(0x2ECC71)
      .setTimestamp()

  )  
}
