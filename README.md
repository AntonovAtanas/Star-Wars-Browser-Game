# Star Wars Browser Game
Created with HTML, CSS, JS and Lit-Html. Deployed on Firebase.


## Live Demo
[Live Demo](https://star-wars-game-1efb4.web.app/)



## Description
- This is a side scrolling game where the player needs to reach 100 000 points to win.
- The player can shoot at the enemies with "Enter" key on the keyboard.
- The game starts with 10 lives.
- Blue and orange bonus which provide additional lives or speed.
- The player has to avoid collision with the TIE Fighters because he will lose the game.
- Every TIE Fighter reaching the left screen takes away 1 life.
- At 50 000 points the Death Star is spawning. The player has to avoid being hit by it's lasers.



## How to play
  - ` ` `W` ` ` - Press `W` to move UP.
  - `A` `S` `D` - Press `A` to move LEFT, `S` to move DOWN and `D` to move RIGHT.
  - `Enter` - Press `Enter` to shoot.



## Game Logic
- The Millenium Falcon is moving based on pressed key which causes its movement on the viewport.
- TIE Fighters are spawned and removed based on DOM manipulations. Their movement is with predefined pixels to the left which are increasing in time to make the game harder. Every hit TIE Fighter is removed and adds 1000 points to the total score.
- The player loses 1 life when any TIE Fighter reaches the left screen.
- The Death Star is spawned when the player reaches 50 000 points. It can shoot lasers which are increasing in time to make it harder. It is also moving up and down. Every hit on the Death Star adds 2000 points to the total score.
- Randomly the game spawns orange and blue bonuses. The orange bonus makes the Millenium Falcon faster. The blue bonus adds up one life.
- A method checks every frame if an element collides with another element based on their position on the viewport.



# Screenshots
![start-screen](https://user-images.githubusercontent.com/114076833/233952388-0db5ac4e-e427-42f7-af75-09854a44ab3c.JPG)
![game-screen-1](https://user-images.githubusercontent.com/114076833/233952474-ba60d6d1-6f6f-4f4d-8a96-f0eadb93703f.JPG)
![game-screen-2](https://user-images.githubusercontent.com/114076833/233956758-021299e8-66a8-4491-a62f-bf3e0b231fff.JPG)
![game-screen-end](https://user-images.githubusercontent.com/114076833/233956789-89f67718-b5af-4064-9f8e-145bb5798e9a.JPG)
![game-screen-win](https://user-images.githubusercontent.com/114076833/233956815-5063f843-1b3c-4ded-a667-045c2d310313.JPG)
