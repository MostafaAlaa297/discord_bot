const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const keepAlive = require("./server.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// const questions = [
//   ["In what year did World War II begin?", "1939"],
//   ["What was the name of the battle that marked the turning point of World War II in Europe?", "The Battle of Stalingrad"],
//   ["Who was the leader of Nazi Germany during World War II?", "Adolf Hitler"],
//   ["Who painted the Mona Lisa?", "Leonardo da Vinci"],
//   ["What is the smallest planet in our solar system?", "Mercury"],
//   ["What is the capital of Spain?", "Madrid"],
//   ["What year did the first man walk on the moon?", "1969"],
//   ["What is the largest mammal in the world?", "Blue whale"],
//   ["Who wrote the Harry Potter series?", "J.K. Rowling"],
//   ["What is the currency of Japan?", "Yen"],
//   ["What is the capital of Australia?", "Canberra"],
//   ["Who composed the opera 'The Barber of Seville'?", "Gioachino Rossini"],
//   ["What is the tallest mountain in Africa?", "Mount Kilimanjaro"],
//   ["In what year did the Cold War end?", "1991"],
//   ["What is the largest country in South America?", "Brazil"],
//   ["Who discovered the theory of relativity?", "Albert Einstein"],
//   ["What is the largest desert in the world?", "Sahara"],
//   ["What is the capital of New Zealand?", "Wellington"],
//   ["What is the capital of Canada?", "Ottawa"],
//   ["Who painted the ceiling of the Sistine Chapel?", "Michelangelo"],
//   ["What is the capital of Turkey?", "Ankara"],
//   ["What is the smallest continent by land area?", "Australia"],
//   ["What is the largest planet in our solar system?", "Jupiter"],
//   ["Who wrote 'The Catcher in the Rye'?", "J.D. Salinger"],
//   ["What is the currency of Italy?", "Euro"],
//   ["What is the capital of Russia?", "Moscow"],
//   ["What is the highest mountain in North America?", "Denali"],
//   ["What is the capital of South Africa?", "Pretoria"],
//   ["Who painted 'Starry Night'?", "Vincent van Gogh"],
//   ["What is the smallest country in the world by land area?", "Vatican City"],
//   ["What is the capital of Egypt?", "Cairo"],
//   ["Who wrote 'The Great Gatsby'?", "F. Scott Fitzgerald"],
//   ["What is the currency of Mexico?", "Peso"],
//   ["What is the largest city in Canada?", "Toronto"],
//   ["What is the capital of Sweden?", "Stockholm"],
//   ["What is the capital of Brazil?", "Brasília"],
//   ["What is the currency of China?", "Yuan"],
//   ["What is the largest country in Africa by land area?", "Algeria"],
//   ["What is the capital of Argentina?", "Buenos Aires"],
//   ["Who painted 'Guernica'?", "Pablo Picasso"],
//   ["What is the currency of South Korea?", "Won"],
//   ["What is the capital of Iran?", "Tehran"],
//   ["What is the smallest country in the world by population?", "Vatican City"],
//   ["What is the capital of Norway?", "Oslo"],
//   ["What is the currency of Switzerland?", "Swiss franc"],
//   ["What is the capital of Denmark?", "Copenhagen"],
//   ["What is the currency of India?", "Rupee"],
//   ["What is the currency of the United Arab Emirates?", "Dirham"],
//   ["What is the capital of Mexico?", "Mexico City"],
//   ["What is the currency of Saudi Arabia?", "Riyal"],
//   ["What is the capital of Portugal?", "Lisbon"]
// ];

// function quize(numQuestions, numPlayers, playersNames){
//   const scores = {};
//   const players = [];
//   numOfPlayers = parserInt(numPlayers)
//   numOfQuestions = parserInt(numQuestions)

//   for(let i = 0; i < numPlayers; i++){
//     if(playersNames.length === numPlayers){
//       players.push(playersNames[i]);
//       scores[playersNames[i]] = 0;
//     }
//   }
// }

function getJoke() {
  return fetch("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,explicit")
  .then(res => res.json())
  .then(data => {
    if(data["type"] === "twopart"){
      return `\> ${data["setup"]}\n\`\`\`${data["delivery"]}\`\`\``
    } else {
        return data["joke"]
      }
  }) 
}
/* Using then */
function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => res.json())
    .then(data => data[0]["q"] + " -" + data[0]["a"]);
}
/* Using then */
function getAdvice() {
  return fetch("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(data => data["slip"]["advice"]);
}
/* Using async await */
const getCatPic = async (type) => {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search?mime_types=${type.match(/^\$cat$/i) ? 'png' : type}`);
  const data = await res.json();
  const url = data[0]["url"];
  console.log(url)
  console.log(type)
  return url;
}
/* Using async await */
const getDogPic = async (type) => {
  const res = await fetch(`https://api.thedogapi.com/v1/images/search?mime_types=${type.match(/^\$dog$/i) ? 'png' : type}`);
  const data = await res.json();
  const url = data[0]["url"];
  console.log(url)
  console.log(type)
  return url;
};
/* Message after the bot logs in to the server */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (msg) => {
  /* Check if the bot who sent the message to prevent it from answering itself :() */
  if (msg.author.bot) return;

  /* Bot response to messages */
  if(msg.content.match(/^i feel (bad|mad|sad)$|^\$booster$/i)){
    msg.reply(`Did someone call me just now❓ Mood booster is here to help‼️\nWhat would you like to pick to boost you mood, ${msg.author.username[0] === "." ? msg.author.username[1].toUpperCase() + msg.author.username.slice(2) : msg.author.username}? 🤖\n\`\`\`$joke (Text)\n$qoute (Text)\n$advice (Text)\n$cat (jgp | png | gif)\n$dog  (jpg | png | gif)\`\`\``)
  }
  if (msg.content) {
    console.log(`Received message: ${msg.content}`);
    /* For getting Random quotes */
    if (msg.content === '$quote') {
      getQuote().then(quote => msg.channel.send(quote));
    }
    /* For getting random pieces of advice */
    if (msg.content === '$advice') {
      getAdvice().then(advice => msg.channel.send(advice));
    }
    /* For getting cat images */ 
    if (msg.content.match(/^\$cat\s(gif|jpg|png)$/i)) {
      getCatPic(msg.content.slice(5)).then(url => {
        const img = new EmbedBuilder().setImage(url);
        msg.channel.send({ embeds: [img] });
      })
    }
    else if(msg.content.match(/^\$cat$/i)){
       getCatPic(msg.content).then(url => {
        const img = new EmbedBuilder().setImage(url);
        msg.channel.send({ embeds: [img] });
      })
    }
    /* For getting dog images */
    if (msg.content.match(/^\$dog\s(gif|jpg|png)$/i)) {
      getDogPic(msg.content.slice(5)).then(url => {
        const img = new EmbedBuilder().setImage(url);
        msg.channel.send({ embeds: [img] });
      })
    }
    else if(msg.content.match(/^\$dog$/i)){
       getDogPic(msg.content).then(url => {
        const img = new EmbedBuilder().setImage(url);
        msg.channel.send({ embeds: [img] });
      })
    }
    /* For getting jokes */
    if(msg.content === "$joke"){
      getJoke().then(joke => {
        msg.channel.send(joke)
      })
    }
  }else{
    console.log("No message content");
  }
});
keepAlive();
client.login(process.env.TOKEN);