import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

export default function Home() {
  return (
      <div className="about-container">
        <section>
          <h2>Get Started</h2>
          <p>
            First of all, the player has to <Link to="/register" className="about-link">create an account</Link>. Then
            the player can click "Play" and write the username of the player they want
            to play with. After both of the players are connected, the game will start.
          </p>
        </section>

        <section>
          <h2>Jeopardy Rules Explained</h2>
          <p>
            The game will randomly generate the username of the player who will
            start first. After that, the same player will be able to choose a
            category that equals to certain amount of points. When the category
            is chosen, the player will be able to answer a question. When the
            player is ready with the answer, they have to click it and the the
            game will show whether the player answer is correct or not. If it is
            correct, then the points will be added to their total score. Then
            the second player will have the chance to choose a category and
            answer a question. The game finishes when all categories are opened
            and all questions are answered. At the end, the game will show the
            winner's name or a message that the game is tied. Both players will
            be able to see their points collected through the game.
          </p>
        </section>
      </div>
  );
}
