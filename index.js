require('dotenv').config();

const Discord = require('discord.js');
const { env, disconnect } = require('process');
const bot = new Discord.Client( {partials: ['MESSAGE', "CHANNEL", "REACTION"]} );
const token = process.env.Discord_Token;
const prefix = '!';

var ticketNumber = 0;

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
        msgEmbed.react('🎥');
        msgEmbed.react('🐙');
        msgEmbed.react('📫');
    }
})

bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;

    if (reaction.message.channel.id === process.env.DISCORD_CHANNEL_ID) {
        // we are making it into the correct channel
        if (reaction.emoji.name === '🎥') {
            //console.log('inside');
            await reaction.message.guild.members.cache.get(user.id).roles.add(process.env.DISCORD_ROLE_ID);
        }

        else if (reaction.emoji.name === '📫') {
            ticketNumber++;

            await reaction.message.guild.members.cache.get(user.id).send("Your ticket number is: " + ticketNumber);
            
            const embed = new Discord.MessageEmbed()
                    .setTitle('Ticket Number: ' + ticketNumber)
                    .setDescription('User ' + user.username)
                    .setColor('RED');
    
            await reaction.message.guild.members.cache.get(process.env.DISCORD_BOT_OWNER).send(embed);
        }
    }
})

bot.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;

    if (reaction.message.channel.id === process.env.DISCORD_CHANNEL_ID) {
        if (reaction.emoji.name === '🎥') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(process.env.DISCORD_ROLE_ID);
        }
    }

})

bot.login(token);
