# The Boogeyman: A Front-End-Game

The Boogeyman is a 2D front-end side-scroller game; inspired by the 1978 film "Halloween".

## How to Survive

---

On Halloween night, everyone is entitled to one good scare.

Use the left, right, and up arrow keys to avoid obstacles.

## Deployed Site

---

- <https://the-boogeyman.netlify.app/>

## Languages, Skills, and Methods Utilized

---

- Vanilla JavaScript, HTML, CSS, and Canvas
- Object-oriented Design and Programming
- Array data structures and methods
- Game mechanics emulating real physical concepts such as jumping and "gravity"
- Math, geometry, and algebra used for object interactivity, collision detection functions, and canvas animations/FPS adjustments
- Implemented Flexbox and CSS techniques to encapsulate canvas into a "game window"
- Event Listeners and Handlers and player input "tracking"
- Canvas animations and methods such as requestFrameAnimation
- Recursive function to update animation in loop with the base cases being a gameOver event and/or a game loss event

## More on How the Game Works

---

A primary player class was created with properties representing, size, shape, and positioning. An input handler was created to register inputs and affect player movement and physics. An update method was also included to exist in the canvas animation loop.

Images are redrawn onto the canvas at 60 frames per second and the canvas is cleared at the start of each animation.
A scrolling background image is on loop using a translation in the X direction.

The player class was modified to represent the enemy.
An obstacle class was created to set obstacles characteristics and positioning. Obstacles are instantiated and subsequently generated on loop (with random spawn rate/object speeds). As they are instantiated they are pushed into an array. While the instantiated obstacle class exists in the array it will generate an object.

To prevent the build up of objects off sreen, once an object is off screen, it is marked for deletion with a helper variable and set to be deleted as the requestAnimation refreshes.

A countdown clock is drawn onto the canvas and updated using conditional logic and string interpolation to give the appearance of a traditional countdown timer in minutes and seconds.

Sprites sourced from Mugen guild: https://mugenguild.com/forum/topics/

### Intended Use

---

This project is intended for personal learning, was created with the intent to learn, and serves as an homage to my favorite film and composer of all time.
I am showcasing my programming skills on a small scale while including forms of art from my favorite genre, music and film, as inspiration.

Please contact me at balvarez325@gmail.com if there are any questions regarding this project.
