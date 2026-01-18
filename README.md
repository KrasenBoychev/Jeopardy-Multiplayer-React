# Jeopardy Multiplayer Game

Jeopardy Multiplayer is a game that can be played by two players who are connected with the help of the Socket.IO library. The players choose 4 categories and then answer questions. At the end of the game, there is a winner or the game finishes tied. In both cases the players gain their points and they are added to their total score. The Home Page shows a Leaderboard where the top 10 players render. The aim of every player should be to take the first place!

Also, there is an Admin account, so the owner of the game can create new categories and questions. The admin can play a game as well, but their score will not be shown in the Leaderboard. The purpose of that is the admin to be able to test the game and more specifically, whether all categories and questions render properly.

## Features

- ### Socket.IO
- ### React Redux
- ### React RTK Query
- ### Responsive Design
- ### Tailwind Components
- ### MongoDB

## Click the video below to watch the demo of the game:

[![Watch the video](https://img.youtube.com/vi/KD0SuQKmQEA/0.jpg)](https://youtu.be/KD0SuQKmQEA)

## New Design (released January 2026):

- #### Authentication Page (Login/Register):

  ![Alt text](images-README/login.png)
  ![Alt text](images-README/register.png)

- #### Home Page:

  ![Alt text](images-README/home.png)

- #### Play Page:

  ![Alt text](images-README/received_game_req.png)
  ![Alt text](images-README/sent_game_req.png)

- #### Game Pages:

  ![Alt text](images-README/categories.png)
  ![Alt text](images-README/questions.png)
  ![Alt text](images-README/single_question.png)
  ![Alt text](images-README/questions_answered.png)
  ![Alt text](images-README/result.png)
  ![Alt text](images-README/leave_game.png)

- #### About Page:

  ![Alt text](images-README/about.png)

- #### Notifications:

  ![Alt text](images-README/notifications.png)

- #### If a user logs in from another device, a message shows in the Play Page:

  ![Alt text](images-README/another_device.png)

- #### Admin Pages:

  ![Alt text](images-README/admin.png)
  ![Alt text](images-README/create_category.png)
  ![Alt text](images-README/create_question.png)

## Getting Started

### Installing

- Clone the repository or download all files.

### Executing program

- Run Client

```
cd client
```

```
npm install
```

```
npm run dev
```

- Run Server

```
cd server
```

```
npm install
```

```
npm start
```
