var mainState = {
// Load Imgs + Sounds
  preload: function() {
    //the "bird"
    game.load.image('bird', 'assets/bird.png');

    //Pipes
    game.load.image('pipe', 'assets/pipe.png');

    //jump sound
    game.load.audio('jump', 'assets/jump.wav');

  },

//called after preload - Setting up the game
  create: function() {

    // BG color Blue
    game.stage.backgroundColor = '71c5cf';

    // Set the physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Displaying da bird
    this.bird = game.add.sprite(100, 245, 'bird');

    //Bird getting Physics
    this.game.physics.arcade.enable(this.bird);

    //Gravity for the Bird
    this.bird.body.gravity.y = 950;

    //crtls
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    //Pipe Loop
    this.pipes = game.add.group();
    this.timer = game.time.events.loop(1500, this.add_row_of_pipes, this);

    // Add a score label on the top left of the screen
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
    { font: "30px Arial", fill: "#ffffff" });

    //Smoothing Animation - anchor to the left and downward
    this.bird.anchor.setTo(-0.2, 0.5);

    //sound
    this.jumpSound = game.add.audio('jump');
  },

//Games logic - called 60 times/sec
  update: function() {
    if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();

    if (this.bird.angle < 20)
    this.bird.angle += 1;

    game.physics.arcade.overlap(
    this.bird, this.pipes, this.hit_pipe, null, this);

  },

  //jump
  jump: function() {

    if (this.bird.alive == false)
        return;

    this.jumpSound.play();

    this.bird.body.velocity.y = -350;
    // Create an animation on the bird
    var animation = game.add.tween(this.bird);

    // Change the angle of the bird to -20° in 100 milliseconds
    animation.to({angle: -20}, 100);

    // And start the animation
    animation.start();
  },

  // restart function
  restartGame: function() {
    game.state.start('main');
  },

  // Add a pipe on the screen
  add_one_pipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;

  },

  // Add a row of 6 pipes with a hole somewhere in the middle
  add_row_of_pipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1)
            this.add_one_pipe(400, i * 60 + 10);

    this.score += 1;
    this.labelScore.text = this.score;
  },

  hit_pipe: function() {
    // If the bird has already hit a pipe, do nothing
  // It means the bird is already falling off the screen
  if (this.bird.alive == false)
      return;

  // Set the alive property of the bird to false
  this.bird.alive = false;

  // Prevent new pipes from appearing
  game.time.events.remove(this.timer);

  // Go through all the pipes, and stop their movement
  this.pipes.forEach(function(p){
      p.body.velocity.x = 0;
  }, this);
},

};

//Initialize Phaser - 400px x 490 px Area
var game = new Phaser.Game(400, 490);

//Add mainState - calling it main
game.state.add('main', mainState)

//Start the game
game.state.start('main');
