//we want javascript to wait until game is fully loaded

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  //ctx = contect --> instance of built-in canvas 2d that holds drawing methods and properties needed for animation
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 720;

  // split game responsibilities into classes

  // input handler class (applies event listeners to keyboard and holds array of all currently active keys)
  class InputHandler {
    constructor() {
      //this.keys will handle control events, keys are added and removed from this array as pressed and released
      this.keys = [];
      //event listener in constructor so when instance of class is created/executed, this allows event listeners to be auto applied
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowUp") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
        console.log(e.key, this.keys);
      });
      //when we release a key, if the key is arrowdown find index of that key in this.keys and remove from the end of the array
      //in short when pressed added when released remove
      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowUp"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        console.log(e.key, this.keys);
      });
    }
  }

  // player class (reacts to keys and reacts by draws in and update players)
  class Player {}

  //background class  (endliss scrolling background)
  class Background {}

  // enemy generation class

  class Obstacle {}

  // function for adding, animating and removing enemies
  function handleObstacles() {}

  // display status text (have a timer possibly or display score)
  function displayStatusText() {}

  // instantiate the input handler
  const input = new InputHandler();

  // main animation loop to update and draw game 60 times per second
  function animate() {}
});
