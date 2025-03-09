# Jeopardy Multiplayer Game

Jeopardy Multiplayer is a game that can be played by two players who are connected with the help of the StreamChat library. They have to type their usernames and the game starts. The players choose 4 categories and then asnwer questions. At the end of the game, there is a winner or the game finishes tied. In both cases the players gain their points and they are added to their total score. The Home Page shows a Leaderboard where the top 10 players render. The aim of every player should be to take the first place!

Also, there is an Admin account, so the owner of the game can create new categories and questions. The admin can play a game as well, but their score will not be shown in the Leaderboard. The purpose of that is the admin to be able to test the game and more specifically, whether all categories and questions render properly.

The project is in progress - next step will be a player to send a game invitation and the other player to be able to accept or reject it. When this functionality is completed, there may be a friends list in every player's account, so the players don't have to type the username of their friends every time they want to play with them.
All that will happen by using the Socket.io library.

## Getting Started

### Installing

* Clone the repository or download all files.

### Executing program
* Run Client
```
cd client
```
```
npm install
```
```
npm run dev
```

* Run Server
```
cd server
```
```
npm install
```
```
npm start
```