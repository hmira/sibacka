
// create a Pixi application
let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0xc1daf9 });

const HEIGHT = 720;
const WIDTH = 1280;

const STATE_WALKING = 1;
const STATE_JUMP_START = 2;
const STATE_JUMP_END = 3;
const STATE_JUMPING = 4;
const STATE_WRENCHES = 5;


window.addEventListener("resize", resize(app));

document.body.appendChild(app.view);

let animatedCapguy, walkingGuy, jumpGuyStart, jumpGuyEnd, background, background2, spritesheetname;

let topBackgroundOffset;

let suhajWalk, suhajJump, suhajWrenches;

let explosion;

let postition = 0;

let suhajState = STATE_WALKING;

// spritesheetname = usePng8 ? "images/spritesheet-png8.json" : "images/spritesheet.json";

const suhajWrenchesFrames = [
"assets/suhaj_wrenches_hq/suhaj_wrenches_000.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_001.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_002.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_003.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_004.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_005.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_006.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_007.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_008.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_009.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_010.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_011.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_012.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_013.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_014.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_015.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_016.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_017.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_018.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_019.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_020.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_021.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_022.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_023.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_024.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_025.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_026.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_027.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_028.png",
"assets/suhaj_wrenches_hq/suhaj_wrenches_029.png"];

// load sprite sheet image + data file, call setup() if completed
PIXI.Loader.shared
    .add("assets/background.json")
    .add("assets/suhaj_walk.json")
    .add("assets/suhaj_jump.json")
    .add("assets/suhaj_wrenches.json")
    .add("assets/explosion.json")
    .add(suhajWrenchesFrames)
    .load(setup);


function setup() {
    // the sprite sheet we've just loaded:
    let sheet = PIXI.Loader.shared.resources["assets/background.json"].spritesheet;

    let suhajWalkSheet = PIXI.Loader.shared.resources["assets/suhaj_walk.json"].spritesheet;
    let suhajJumpSheet = PIXI.Loader.shared.resources["assets/suhaj_jump.json"].spritesheet;
    let suhajWrenchesSheet = PIXI.Loader.shared.resources["assets/suhaj_wrenches.json"].spritesheet;

    let explosionSheet = PIXI.Loader.shared.resources["assets/explosion.json"].spritesheet;

    // initialize background sprite
    background = new PIXI.Sprite(sheet.textures["background_sibacka.png"]);
    background2 = new PIXI.Sprite(sheet.textures["background_sibacka.png"]);
    app.stage.addChild(background, background2);

    // scale stage container that it fits into the view
    app.stage.scale.x = app.view.width / background.width;
    app.stage.scale.y = app.view.height / background.height;

    suhajWalk = new PIXI.AnimatedSprite(suhajWalkSheet.animations["suhaj_walk"]);
    suhajWalk.position.set(400, background.height - 100);
    suhajWalk.animationSpeed = 1;
    suhajWalk.renderable = true;
    suhajWalk.scale.x = 1.5;
    suhajWalk.scale.y = 1.5;
    suhajWalk.play();

    suhajJump = new PIXI.AnimatedSprite(suhajJumpSheet.animations["suhaj_jump"]);
    suhajJump.position.set(400, background.height - 100);
    suhajJump.animationSpeed = 1;
    suhajJump.renderable = false;
    suhajJump.scale.x = 1.5;
    suhajJump.scale.y = 1.5;
    suhajJump.loop = false;
    suhajJump.stop();
    suhajJump.onComplete = function() {
        suhajState = STATE_WALKING;
        updateSpritesByState();
        console.log("jump ends");
    };

//    suhajWrenches = new PIXI.AnimatedSprite(suhajWrenchesSheet.animations["suhaj_wrenches"]);
    suhajWrenches = PIXI.AnimatedSprite.fromFrames(suhajWrenchesFrames);
    suhajWrenches.anchor.set(0.32302,0.72196)
    suhajWrenches.position.set(400, background.height - 100);
    suhajWrenches.animationSpeed = 0.5;
    suhajWrenches.renderable = false;
    suhajWrenches.scale.x = 1.5;
    suhajWrenches.scale.y = 1.5;
    suhajWrenches.loop = false;
    suhajWrenches.onComplete = function() {
        suhajState = STATE_WALKING;
        updateSpritesByState();
        console.log("hit ends");
    };

    explosion = new PIXI.AnimatedSprite(explosionSheet.animations["Explosion_Sequence_A "]);
    explosion.position.set(300, 300);
    explosion.play();

    // add it to the stage and render!
    app.stage.addChild(suhajWalk);
    app.stage.addChild(suhajWrenches);
    app.stage.addChild(suhajJump);
    app.stage.addChild(explosion);
    app.ticker.add(delta => gameLoop(delta));

    resize(app).call();
}

function updateYs() {
    background.y = background2.y = topBackgroundOffset;
    suhajWalk.y = background.height - 100 + topBackgroundOffset;
    suhajWrenches.y = background.height - 100 + topBackgroundOffset;
    suhajJump.y = background.height - 100 + topBackgroundOffset;
}

function gameLoop(delta) {
    if (suhajWalk.x < background.width / 2) {
        suhajWalk.x = (suhajWalk.x + 3*delta) % (background.width + 200);
        suhajJump.x = suhajWalk.x;
        suhajWrenches.x = suhajWalk.x;
    }

    //experimental game
    postition += 10;
    background.x = -(postition * 0.5);
    background.x %= 1280 * 2;
    if (background.x < 0) {
        background.x += 1280 * 2;
    }
    background.x -= 1280;

    background2.x = -(postition * 0.5) + 1280;
    background2.x %= 1280 * 2;
    if (background2.x < 0) {
        background2.x += 1280 * 2;
    }
    background2.x -= 1280;
}

function wrenchesHit() {
    suhajState = STATE_WRENCHES;
    updateSpritesByState();
    console.log("hit starts");
}

function jump() {
    if (suhajState != STATE_WALKING) {
        return;
    }
    suhajState = STATE_JUMPING;
    updateSpritesByState();
}
app.renderer.plugins.interaction.on('pointerdown', jump);

function updateSpritesByState() {
    if (suhajState == STATE_WALKING) {
        suhajWalk.renderable = true;
        suhajWalk.gotoAndPlay(0);
        suhajJump.renderable = false;
        suhajWrenches.renderable = false;
    } else if (suhajState == STATE_JUMPING) {
        suhajJump.renderable = true;
        suhajJump.gotoAndPlay(0);
        suhajWalk.renderable = false;
    } else if (suhajState == STATE_WRENCHES) {
        suhajWrenches.renderable = true;
        suhajWrenches.gotoAndPlay(0);
        suhajWalk.renderable = false;
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
      // nvh = vph;
      // nvw = (nvh * WIDTH) / HEIGHT;

      nvh = vph;
      nvw = vpw;
    } else {
      // In the else case, the opposite is happening.
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }
    
    // Set the game screen size to the new values.
    // This command only makes the screen bigger --- it does not scale the contents of the game.
    // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
    
    // app.renderer.resize(nvw, nvh);
    
    // This command scales the stage to fit the new size of the game.
    app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);

    app.renderer.resize(nvw, window.innerHeight);

    topBackgroundOffset = ((window.innerHeight - nvh) * HEIGHT) / nvh;

    console.log(nvh);
    updateYs();
    // console.log("resize:")
    // console.log(WIDTH, HEIGHT, nvw, nvh, vpw, vph);
  };
}