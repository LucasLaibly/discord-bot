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
        msgEmbed.react('🎥');
        msgEmbed.react('🐙');
        msgEmbed.react('🦑');
    }
})

bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;

    if (reaction.message.channel.id === "753769059945807886") {
        // we are making it into the correct channel
        if (reaction.emoji.id === '754172422692798565') {
            //console.log('inside');
            await reaction.message.guild.members.cache.get(user.id).roles.add("754170556131049493");
        }
    }

})

bot.login(token);
