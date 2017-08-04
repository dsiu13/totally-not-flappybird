var mainState = {
// Load Imgs + Sounds
  preload: function() {

  },

//called after preload - Setting up the game
  create: function() {

  },

//Games logic - called 60 times/sec
  update: function() {

  },
};

//Initialize Phaser - 400px x 490 px Area
var game = new Phaser.Game(400, 490);

//Add mainState - calling it main
game.state.add('main', mainState)

//Start the game
game.state.start('main');
