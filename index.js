const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const prefix = '-';
const mysqlQuery = require("./main/queries.js")

fs.readdir("./events/", (err, files) => {
    if (err) return process.env.FEEDBACKEFFOR;
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args))
    });
});

client.on('message',async function(message){
    if(message.author.bot) return;
	  if(message.channel.type == 'text') {

    result = await mysqlQuery.SELECT("*", "global", `WHERE userid = ${message.author.id}`);
    console.log(result[0]);
    if(!result){
      mysqlQuery.INSERT('`global`(userid, username)', `('${message.author.id}', '${message.author.username}')`);
		} else {
      //mysqlQuery.UPDATE('global', `username = ${message.author.username}`, `WHERE userid = ${message.author.id}`);
      mysqlQuery.UPDATE('global', 'xp = xp + 3', `WHERE userid = ${message.author.id}`);

      result2 = await mysqlQuery.SELECT("*", "global", `WHERE userid = ${message.author.id}`);
      mysqlQuery.UPDATE('global', `level = ${parseInt(lvl(result2[0].xp))}`, `WHERE userid = ${message.author.id}`);

      result3 = await mysqlQuery.SELECT(`*`, `global`, `WHERE userid = ${message.author.id}`);
      if(result[0].lvl !== result3[0].lvl) message.channel.send(`Поздравляем с **${result3[0].lvl}** уровнем, ${message.author}!`);
		}

		/*con.query(`SELECT * FROM local WHERE userid='${message.author.id}' AND serverid = '${message.guild.id}'`, function(err, result){
		    if(err) return process.env.FEEDBACKEFFOR;
			  if(!result){
				    con.query(`INSERT INTO local (serverid, type, userid) VALUES('${message.guild.id}', 'member', '${message.author.id}')`, function(err, result){
			           if(err) return process.env.FEEDBACKEFFOR;
				    })
			  } else {
				con.query(`UPDATE local SET xp = xp + 3 WHERE userid = ${message.author.id} AND serverid = ${message.guild.id} AND type = 'member'`, function(err){
					if(err) return process.env.FEEDBACKEFFOR;
					con.query(`SELECT * FROM local WHERE serverid = ${message.guild.id} AND type = 'leveledrole' ORDER BY local.xpcount DESC`, function(err, result2){
						if(err) process.env.FEEDBACKEFFOR;
						if(!result2) return;
						for(var i = 0; i < result2.length; i++){
							if(result[0].xp > result2[i].xpcount){
								if(!message.guild.members.get(result[0].userid).roles.has(result2[i].roleid)){
									message.member.addRole(result2[i].roleid);
									if(i != (result2.length - 1)){
										if(message.guild.members.get(result[0].userid).roles.has(result2[i+1].roleid)){
											message.member.removeRole(result2[i+1].roleid);
										}
									}
									message.channel.send(`Вы успешно повысились до уровня **${message.guild.roles.get(result2[i].roleid).name}**`)
								} else break;
							} else continue;
						};
					})
				});
			};
		});*/

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(message.content.indexOf(prefix) !== 0) return;
	  if(!command) return;
    if(message.content == "-_-") return;
    if(message.content == "--")  return;
	  if(message.content == "---") return;

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
		console.log(`Команда "${command}" была использована пользователем ${message.author.username}. Результат - успешно`);
		client.fetchUser(process.env.OWNER_ID).then(user => user.send(`Команда "${command}" была использована пользователем ${message.author.username} в группе ${message.guild.name} (${message.guild.id})`));
    } catch (err) {
		process.env.FEEDBACKEFFOR;
		/*con.query(`SELECT * FROM local WHERE serverid = '${message.guild.id}' AND command = '${command}'`, function(err, result){
			if(err) return process.env.FEEDBACKEFFOR;
			if(!result) return;
			else {
				message.member.addRole(result[0].roleid);
				message.channel.send(message.author + result[0].message);
			}
		})*/
    }
  }
});


function lvl(xp){
	if(xp <= 104) return 0
	if(xp > 104 && xp <= 312) return 1
	if(xp > 312 && xp <= 624) return 2
	if(xp > 624 && xp <= 1040) return 3
	if(xp > 1040 && xp <= 1560) return 4
	if(xp > 1560 && xp <= 2184) return 5
	if(xp > 2184 && xp <= 2912) return 6
	if(xp > 2912 && xp <= 3744) return 7
	if(xp > 3744 && xp <= 4680) return 8
	if(xp > 4680 && xp <= 5720) return 9
	if(xp > 5720 && xp <= 6864) return 10
	if(xp > 6864 && xp <= 8112) return 11
	if(xp > 8112 && xp <= 9464) return 12
	if(xp > 9464 && xp <= 10920) return 13
	if(xp > 10920 && xp <= 12480) return 14
	if(xp > 12480 && xp <= 14144) return 15
	if(xp > 14144 && xp <= 15920) return 16
	if(xp > 15920 && xp <= 17784) return 17
	if(xp > 17784 && xp <= 19760) return 18
	if(xp > 19760 && xp <= 21840) return 19
	if(xp > 21840 && xp <= 24042) return 20
	if(xp > 24042 && xp <= 26312) return 21
	if(xp > 26312 && xp <= 28704) return 22
	if(xp > 28704 && xp <= 31200) return 23
	if(xp > 31200 && xp <= 33800) return 24
	if(xp > 33800 && xp <= 36504) return 25
	if(xp > 36504 && xp <= 39312) return 26
	if(xp > 39312 && xp <= 42224) return 27
	if(xp > 42224 && xp <= 45240) return 28
	if(xp > 45240 && xp <= 48360) return 29
	if(xp > 48360 && xp <= 51584) return 30
	if(xp > 51584 && xp <= 54912) return 31
	if(xp > 54912 && xp <= 58344) return 32
	if(xp > 58344 && xp <= 61880) return 33
	if(xp > 61880 && xp <= 208) return 34
	if(xp > 65520 && xp < 208) return 35
	if(xp > 69264 && xp < 208) return 36
	if(xp > 73112 && xp < 208) return 37
	if(xp > 77064 && xp < 208) return 38
	if(xp > 81120 && xp < 208) return 39
	if(xp > 85280 && xp < 208) return 40
	if(xp > 89544 && xp < 208) return 41
	if(xp > 93920 && xp < 208) return 42
	if(xp > 98392 && xp < 208) return 43
	if(xp > 102968 && xp < 208) return 44
	if(xp > 107648 && xp < 208) return 45
	if(xp > 112432 && xp < 208) return 46
	if(xp > 117320 && xp < 208) return 47
	if(xp > 122312 && xp < 208) return 48
	if(xp > 127408 && xp < 208) return 49
	if(xp > 132608 && xp < 208) return 50
	if(xp > 137912 && xp < 208) return 51
	if(xp > 143320 && xp < 208) return 52
	if(xp > 148832 && xp < 208) return 53
	if(xp > 154448 && xp < 208) return 54
	if(xp > 160168 && xp < 208) return 55
	if(xp > 165992 && xp < 208) return 56
	if(xp > 171920 && xp < 208) return 57
	if(xp > 177952 && xp < 208) return 58
	if(xp > 184088 && xp < 208) return 59
	if(xp > 190328 && xp < 208) return 60
	if(xp > 196568 && xp < 208) return 61
	if(xp > 202912 && xp < 208) return 62
	if(xp > 209360 && xp < 208) return 63
	if(xp > 215912 && xp < 208) return 64
	if(xp > 222568 && xp < 208) return 65
	if(xp > 229328 && xp < 208) return 66
	if(xp > 236192 && xp < 208) return 67
	if(xp > 243160 && xp < 208) return 68
	if(xp > 250232 && xp < 208) return 69
	if(xp > 257408 && xp < 208) return 70
	if(xp > 264688 && xp < 208) return 71
	if(xp > 272072 && xp < 208) return 72
	if(xp > 279560 && xp < 208) return 73
	if(xp > 287152 && xp < 208) return 74
	if(xp > 294848 && xp < 208) return 75
	if(xp > 302648 && xp < 208) return 76
	if(xp > 310552 && xp < 208) return 77
	if(xp > 318560 && xp < 208) return 78
	if(xp > 326672 && xp < 208) return 79
	if(xp > 334888 && xp < 208) return 80
	if(xp > 343208 && xp < 208) return 81
	if(xp > 351528 && xp < 208) return 82
	if(xp > 359952 && xp < 208) return 83
	if(xp > 368480 && xp < 208) return 84
	if(xp > 377112 && xp < 208) return 85
	if(xp > 385848 && xp < 208) return 86
	if(xp > 394688 && xp < 208) return 87
	if(xp > 403632 && xp < 208) return 88
	if(xp > 412680 && xp < 208) return 89
	if(xp > 421832 && xp < 208) return 90
	if(xp > 431088 && xp < 208) return 91
	if(xp > 440448 && xp < 208) return 92
	if(xp > 449912 && xp < 208) return 93
	if(xp > 459480 && xp < 208) return 94
	if(xp > 469152 && xp < 208) return 95
	if(xp > 478928 && xp < 208) return 96
	if(xp > 488808 && xp < 208) return 97
	if(xp > 498792 && xp < 208) return 98
	if(xp > 508880 && xp < 208) return 99
	if(xp > 519072 && xp < 208) return 100
	if(xp > 529368 && xp < 208) return 101
}

client.login(process.env.TOKEN);

//const YouTube = require('simple-youtube-api');
//const ytdl = require('ytdl-core');
//const youtube = new YouTube(process.env.YOUTUBE_TOKEN);
//const queue = new Map();
/*	const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
	const searchString = args.join(' ');
	const serverQueue = queue.get(message.guild.id);

	if(message.content.startsWith("проигрывать")){
		const voiceChannel = message.member.voiceChannel;
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if(!voiceChannel) return message.channel.send("Вы не находитесь в голосовом канале!")
		if(!permissions.has('CONNECT')) return message.channel.send("Я не могу подключиться к каналу!")
		if(!permissions.has('SPEAK')) return message.channel.send("Я не могу говорить в этом канале!")

		try {
			if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/watch\?v=(.+)$/)){
				const video = youtube.getVideo(url)
				return videoHandler(video, message, voiceChannel);
			} else {
				youtube.searchVideos(searchString, 1)
				.then(videos => {
					return videoHandler(videos[0], message, voiceChannel);
				})
			}
		} catch(err) {
			console.log(err)
			message.channel.send("Поиск не дал результатов ;(")
		}
	}
	if(message.content == "присоединиться"){
		const voiceChannel = message.member.voiceChannel;
		voiceChannel.join();
	}
	if(message.content == "отключиться"){
		const voiceChannel = message.member.voiceChannel;
		voiceChannel.leave();
	}
	if(message.content == "пропустить"){
	const voiceChannel = message.member.voiceChannel;
	if(!voiceChannel) return message.channel.send("Вы не в голосовом канале!");
	if(!serverQueue) return message.channel.send("Нечего пропускать!");
	serverQueue.connection.dispatcher.end(`Кнопка пропустить была задействована!`)
	}
	if(message.content == "остановить"){
	const voiceChannel = message.member.voiceChannel;
	if(!voiceChannel) return message.channel.send("Вы не в голосовом канале!");
	if(!serverQueue) return message.channel.send("Нечего останавливать!");
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end(`Кнопка остановить полностью была задействована!`);
	}
	if(message.content == "громкость"){
	const voiceChannel = message.member.voiceChannel;
	if(!voiceChannel) return message.channel.send("Вы не в голосовом канале!");
	if(!serverQueue) return message.channel.send("Нечему увеличивать/уменшать громкость!");
	if(!args[0]) return message.channel.send(`Ваша громкость - **${serverQueue.volume}**`);
	serverQueue.volume = args[0];
	serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
	return message.channel.send(`Громкость установлена на ${args[0]}`)
	}
	if(message.content == "песня"){
	if(!serverQueue) return message.channel.send("Сейчас ничего не играет!");
	return message.channel.send(`Сейчас играет ー **${serverQueue.songs[0].title}**`)
	}
	if(message.content == "пауза"){
	if(serverQueue && serverQueue.playing) {
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		message.channel.send(`Музыка поставлена успешно на паузу`);
	}
	return message.channel.send(`Ничего не играет`)
	}
	if(message.content == "Продолжить"){
	if(serverQueue && !serverQueue.playing) {
		serverQueue.playing = true;
		serverQueue.connection.dispatcher.resume();
		message.channel.send(`Музыка успешно включена`)
	}
	return message.channel.send(`Ничего не играет`)
	}

async function videoHandler(video, message, voiceChannel){
	const serverQueue = queue.get(message.guild.id)
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	}
	if(!serverQueue){
		const queueConstructor = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		}
		queue.set(message.guild.id, queueConstructor)
		queueConstructor.songs.push(song);

		try {
			const connection = await voiceChannel.join();
			queueConstructor.connection = connection;
			play(message.guild, queueConstructor.songs[0]);
		} catch(err) {
			console.log(err);
			queue.delete(message.guild.id);
			message.channel.send("Я не могу присоединиться к каналу!");
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs)
		message.channel.send(`Песня **${song.title}** успешно добавлена в очередь!`)
	}
}

function play(guild, song){
	const serverQueue = queue.get(guild.id)
	if(!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(queue.delete(guild.id))
	}
	console.log(serverQueue.songs);
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if(reason === "Stream is not generating quickly enough.") console.log("Песня закончилась");
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.log(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Началась песня ー **${song.title}**`)
}*/
	/*fs.writeFile(`lasterror.txt`, error, function(err){
		if(err) console.log(err);
		console.log("Saved!");
		client.fetchUser('412338841651904516').then(user => user.send({
			files: [{
				attachment:`./lasterror.txt`,
				name:`lasterror.txt`
			}]
		}))
	})*/
