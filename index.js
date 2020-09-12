require('dotenv').config();

const Discord = require('discord.js');
const { env, disconnect } = require('process');
const bot = new Discord.Client( {partials: ['MESSAGE', "CHANNEL", "REACTION"]} );
const token = process.env.Discord_Token;
const prefix = '!';

bot.on('ready', () => {
    console.log('Time For Movie Night.');

    bot.user.setActivity('Movie Night Bot!').catch(console.error);
});

bot.on('message', async message => {

    if (message.author.bot || message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    if(!message.content.startsWith(prefix)) return;

    if (cmd === `${prefix}reactions`){
        const embed = new Discord.MessageEmbed()
                    .setTitle('Reaction Roles')
                    .setDescription('React to get a role.')
                    .setColor('GREEN');
    
        let msgEmbed = await message.channel.send(embed);
        msgEmbed.react('😇');
    }
})



bot.login(token);
