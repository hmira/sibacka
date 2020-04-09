
// create a Pixi application
let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });

const HEIGHT = 1080;
const WIDTH = 1920;

const STATE_WALKING = 1;
const STATE_JUMP_START = 2;
const STATE_JUMP_END = 3;

resize(app);
// Add event listener so that our resize function runs every time the
// browser window is resized.
window.addEventListener("resize", resize(app));


// window.addEventListener("resize", function() {
//     console.log("resized");
//     app.renderer.resize(window.innerWidth, window.innerHeight);
// });


// add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let animatedCapguy, walkingGuy, jumpGuyStart, jumpGuyEnd, background, background2, spritesheetname;

let suhajWalk;

let explosion;

let postition = 0;

let guyState = STATE_WALKING;

let suhajState = STATE_WALKING;


spritesheetname = usePng8 ? "images/spritesheet-png8.json" : "images/spritesheet.json";

// load sprite sheet image + data file, call setup() if completed
PIXI.Loader.shared
    .add(spritesheetname)
    .add("assets/walking.json")
    .add("assets/jump_start.json")
    .add("assets/jump_end.json")
    .add("assets/suhaj_walk.json")
    .add("assets/explosion.json")
    .load(setup);


function setup() {
    // the sprite sheet we've just loaded:
    let sheet = PIXI.Loader.shared.resources[spritesheetname].spritesheet;
    let sheet2 = PIXI.Loader.shared.resources["assets/walking.json"].spritesheet;
    let sheet3 = PIXI.Loader.shared.resources["assets/jump_start.json"].spritesheet;
    let sheet4 = PIXI.Loader.shared.resources["assets/jump_end.json"].spritesheet;

    let suhajWalkSheet = PIXI.Loader.shared.resources["assets/suhaj_walk.json"].spritesheet;
    let explosionSheet = PIXI.Loader.shared.resources["assets/explosion.json"].spritesheet;

    // initialize background sprite
    background = new PIXI.Sprite(sheet.textures["background.png"]);
    background2 = new PIXI.Sprite(sheet.textures["background.png"]);
    app.stage.addChild(background, background2);

    // scale stage container that it fits into the view
    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    // create an animated sprite
    animatedCapguy = new PIXI.AnimatedSprite(sheet.animations["capguy"]);

    // configure + start animation:
    animatedCapguy.animationSpeed = 0.167;                  // 6 fps
    animatedCapguy.position.set(0, background.height - 50); // almost bottom-left corner of the canvas
    animatedCapguy.play();

    walkingGuy = new PIXI.AnimatedSprite(sheet2.animations["walk"]);
    walkingGuy.position.set(150, background.height - 180);
    walkingGuy.animationSpeed = 1;
    walkingGuy.play();

    jumpGuyStart = new PIXI.AnimatedSprite(sheet3.animations["jump_start"]);
    jumpGuyStart.position.set(550, background.height - 180);
    jumpGuyStart.animationSpeed = 1;
    jumpGuyStart.renderable = false;
    jumpGuyStart.loop = false;

    jumpGuyStart.onComplete = function() {
        guyState = STATE_JUMP_END;
        updateSpritesByState();
    };

    // jumpGuyStart.play();

    jumpGuyEnd = new PIXI.AnimatedSprite(sheet4.animations["jump_end"]);
    jumpGuyEnd.position.set(350, background.height - 180);
    jumpGuyEnd.animationSpeed = 1;
    jumpGuyEnd.renderable = false ;
    jumpGuyEnd.loop = false;

    jumpGuyEnd.onComplete = function() {
        guyState = STATE_WALKING;
        updateSpritesByState();
    };

    suhajWalk = new PIXI.AnimatedSprite(suhajWalkSheet.animations["suhaj_walk"]);
    suhajWalk.position.set(400, background.height - 300);
    suhajWalk.animationSpeed = 1;
    suhajWalk.renderable = true;
    suhajWalk.scale.x = 1.5;
    suhajWalk.scale.y = 1.5;
    suhajWalk.play();

    explosion = new PIXI.AnimatedSprite(explosionSheet.animations["Explosion_Sequence_A "]);
    explosion.position.set(300, 300);
    explosion.play();

    // add it to the stage and render!
    app.stage.addChild(animatedCapguy);
    app.stage.addChild(walkingGuy);
    app.stage.addChild(jumpGuyStart);
    app.stage.addChild(jumpGuyEnd);
    app.stage.addChild(suhajWalk);
    app.stage.addChild(explosion);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    if (suhajWalk.x < background.width / 2) {
        suhajWalk.x = (suhajWalk.x + 5*delta) % (background.width + 200);
    }

    animatedCapguy.x = (animatedCapguy.x + 5*delta) % (background.width + 200);
    walkingGuy.x = (walkingGuy.x + 5*delta) % (background.width + 200);
    jumpGuyStart.x = walkingGuy.x;
    jumpGuyEnd.x = walkingGuy.x;

    //experimental game
    postition += 10;
    background.x = -(postition * 0.6);
    background.x %= 1286 * 2;
    if (background.x < 0) {
        background.x += 1286 * 2;
    }
    background.x -= 1286;

    background2.x = -(postition * 0.6) + 1286;
    background2.x %= 1286 * 2;
    if (background2.x < 0) {
        background2.x += 1286 * 2;
    }
    background2.x -= 1286;
}

function jump() {
    if (guyState != STATE_WALKING) {
        return;
    }
    guyState = STATE_JUMP_START;
    updateSpritesByState();
}
app.renderer.plugins.interaction.on('pointerdown', jump);

function updateSpritesByState() {
    if (guyState == STATE_WALKING) {
        walkingGuy.renderable = true;
        jumpGuyStart.renderable = false;
        jumpGuyEnd.renderable = false;
    } else if (guyState == STATE_JUMP_START) {
        walkingGuy.renderable = false;
        jumpGuyStart.renderable = true;
        jumpGuyStart.gotoAndPlay(0);
        jumpGuyEnd.renderable = false;
    } else if (guyState == STATE_JUMP_END) {
        walkingGuy.renderable = false;
        jumpGuyStart.renderable = false;
        jumpGuyEnd.renderable = true;
        jumpGuyEnd.gotoAndPlay(0);
    }
}

function resize (app) {
  return function () {
    const vpw = window.innerWidth;  // Width of the viewport
    const vph = window.innerHeight; // Height of the viewport
    let nvw; // New game width
    let nvh; // New game height

    // The aspect ratio is the ratio of the screen's sizes in different dimensions.
    // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.
    
    if (vph / vpw < HEIGHT / WIDTH) {
      // If height-to-width ratio of the viewport is less than the height-to-width ratio
      // of the game, then the height will be equal to the height of the viewport, and
      // the width will be scaled.
      nvh = vph;
      nvw = (nvh * WIDTH) / HEIGHT;
    } else {
      // In the else case, the opposite is happening.
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }
    
    // Set the game screen size to the new values.
    // This command only makes the screen bigger --- it does not scale the contents of the game.
    // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
    app.renderer.resize(nvw, nvh);
    
    // This command scales the stage to fit the new size of the game.
    app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
  };
}