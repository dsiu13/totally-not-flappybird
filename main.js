var mainState = {
// Load Imgs + Sounds
  preload: function() {
    //the "bird"
    game.load.image('bird', 'assets/bird.png');

    //Pipes
    game.load.image('pipe', 'assets/pipe.png');

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
    var style = { font: "30px Arial", fill: "#ffffff" };
    this.label_score = this.game.add.text(20, 20, "0", style);
  },

//Games logic - called 60 times/sec
  update: function() {
    if (this.bird.y < 0 || this.bird.y > 490)
        this.restartGame();

  },

  //jump
  jump: function() {
    this.bird.body.velocity.y = -350;
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
  },

};

//Initialize Phaser - 400px x 490 px Area
var game = new Phaser.Game(400, 490);

//Add mainState - calling it main
game.state.add('main', mainState)

//Start the game
game.state.start('main');
