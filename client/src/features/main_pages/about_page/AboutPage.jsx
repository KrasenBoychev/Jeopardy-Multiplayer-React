"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const firstParagraph = `First of all, the player has to create an account. Then the player can click "Play" and write the username of the player they want to play with. After both of the players are connected, the game will start. `;
const secondParagraphFirstPart = `The game will randomly generate the username of the player who will start first. After that, the same player will be able to choose a category that equals to certain amount of points. `;
const secondParagraphSecondPart = `When the category is chosen, the player will be able to answer a question. When the player is ready with the answer, they have to click it and the the game will show whether the player answer is correct or not. `;
const secondParagraphThirdPart = `If it is correct, then the points will be added to their total score. Then the second player will have the chance to choose a category and answer a question. `;
const secondParagraphFourthPart = `The game finishes when all categories are opened and all questions are answered. At the end, the game will show the winner's name or a message that the game is tied. Both players will be able to see their points collected through the game.`;

const words =
  firstParagraph +
  secondParagraphFirstPart +
  secondParagraphSecondPart +
  secondParagraphThirdPart +
  secondParagraphFourthPart;

export default function AboutPage() {
  return <TextGenerateEffect words={words} />;
}
