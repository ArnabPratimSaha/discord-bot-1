require("dotenv").config();
const ytdl=require("ytdl-core");
const {Client, VoiceChannel}=require("discord.js");
const {Player}=require("discord-music-player");
const client=new Client();
const player=new Player(client);

client.on("ready",()=>
{
    console.log(`${client.user.username}`);
});
client.login(process.env.DISCORD_TOKEN);

client.on("message",message=>{
    const actualmessage=message.toString().trim().toLowerCase();
    const code=actualmessage.slice(0,1);
    if(code===process.env.CODE)
    {
        command=actualmessage.slice(1).trim();
        if(command==="save")
        {
            const channel=message.member.voice.channel;
            if(channel)
            {
                channel.join()
                .then(connection => {
                    const dispacher=connection.play(require("path").join(__dirname,"./music/music2.ogg"), { volume: 1 });
                    dispacher.on("finish",()=>{
                        channel.leave();
                        console.log("leave");
                    })
                });
            }
        }
        else
        {
            message.reply("wrong command");
        }

    }
});