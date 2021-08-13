/* Personal Quiz App for Level 0 - Task 1 */

/* Imports of External Libraries */
const readLine = require('readline-sync')
const chalk = require('chalk')
const questions = require('./questions')
const print = console.log

/* High Score Database Logic */
const Client = require("@replit/database");
const client = new Client()
let highScore = 0;
async function setGetKey(key, value) {
  await client.set(key, value);
  highScore = await client.get(key);
}
setGetKey('highScore', 10) 
client.list().then(keys => {print(keys)});

/* Game start */
let score = 0 // for final score
start()



/* Functions to handle tasks */

function start() {  
  welcomeToGame()
  quizStart()  
  printFinalScore()
}

function welcomeToGame() {
  print("\n")
  print(chalk.blue(`
  -----------------------------------------------
                Welcome to The Quiz
  -----------------------------------------------
  \n`))
  print(chalk.green(`
          Current Highscore: ${highScore}\n
  `))
  const playerName = readLine.question(chalk.blue(`
                What's your name?\n
  `))
  print(chalk.green(`
                Welcome ${playerName}!
    Can you beat the current highscore? Let's play!\n
  `))
}

function quizStart() {
  questions.forEach(question => {
    const {ques, ans} = question
    ask(ques, ans)
  })
}

function printFinalScore() {
  print(chalk.green(`
                Your final score is ${score}
  `))
}

function ask(question, answer) {
  const playerAnswer = readLine.question(chalk.magenta(`
  -----------------------------------------------
  ${question}
  ----------------------------------------------- 
  `))

  if (playerAnswer.toLowerCase() === answer.toLowerCase()) {
    score += 1
    print(chalk.green(`
                  Correct Answer 😀
    `))
    print(chalk.yellow(`
                  Current Score: ${score}\n\n
    `))
  } else {
    print(chalk.red(`
                  Wrong Answer! 😑
    `))
    print(chalk.yellow(`
                  Current Score: ${score}\n
    `))
  }

}