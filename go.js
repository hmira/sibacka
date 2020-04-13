
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

let animatedCapguy, walkingGuy, jumpGuyStart, jumpGuyEnd, background, background2, wrenches, bush1;

let bronzeEgg, silverEgg, goldEgg;

let topBackgroundOffset;

let suhajWalk, suhajJump, suhajWrenches;

let explosion;

let postition = 0;

let suhajState = STATE_WALKING;

let score = 0;
let level = 1;

const suhajYoffset = 100;
const wrenchesYOffset = 178;
const bushOffset = 198;

// spritesheetname = usePng8 ? "images/spritesheet-png8.json" : "images/spritesheet.json";


const suhajWrenchesFrames = [
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_023.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_024.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_025.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_026.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_027.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_028.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_029.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_030.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_031.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_032.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_033.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_034.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_035.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_036.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_037.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_038.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_039.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_040.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_041.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_042.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_043.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_044.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_045.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_046.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_047.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_048.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_049.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_050.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_051.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_052.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_053.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_054.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_055.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_056.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_057.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_058.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_059.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_060.png",
"assets/suhaj_wrenches_fps/hit_by_wrenches_60fps_061.png"];

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
    suhajWalk.position.set(400, background.height - suhajYoffset);
    suhajWalk.animationSpeed = 1;
    suhajWalk.renderable = true;
    suhajWalk.scale.set(1.5);
    suhajWalk.play();

    suhajJump = new PIXI.AnimatedSprite(suhajJumpSheet.animations["suhaj_jump"]);
    suhajJump.position.set(400, background.height - suhajYoffset);
    suhajJump.animationSpeed = 1;
    suhajJump.renderable = false;
    suhajJump.scale.set(1.5);
    suhajJump.loop = false;
    suhajJump.stop();
    suhajJump.onComplete = function() {
        suhajState = STATE_WALKING;
        updateSpritesByState();
        console.log("jump ends");
    };

    suhajWrenches = PIXI.AnimatedSprite.fromFrames(suhajWrenchesFrames);
    suhajWrenches.anchor.set(0.32302,0.72196)
    suhajWrenches.position.set(400, background.height - suhajYoffset);
    suhajWrenches.animationSpeed = 1;
    suhajWrenches.renderable = false;
    suhajWrenches.scale.set(1.5);
    suhajWrenches.loop = false;
    suhajWrenches.onComplete = function() {
        suhajState = STATE_WALKING;
        updateSpritesByState();
    };

    bronzeEgg = new PIXI.Sprite(sheet.textures["bronze_egg.png"]);
    bronzeEgg.anchor.set(0.5);
    bronzeEgg.scale.set(0.5);
    bronzeEgg.position.set(background.width - 100, 100);
    bronzeEgg.renderable = false;

    silverEgg = new PIXI.Sprite(sheet.textures["silver_egg.png"]);
    silverEgg.anchor.set(0.5);
    silverEgg.scale.set(0.5);
    silverEgg.position.set(background.width - 200, 100);
    silverEgg.renderable = false;
    
    goldEgg = new PIXI.Sprite(sheet.textures["gold_egg.png"]);
    goldEgg.anchor.set(0.5);
    goldEgg.scale.set(0.5);
    goldEgg.position.set(background.width - 300, 100);
    goldEgg.renderable = false;

    explosion = new PIXI.AnimatedSprite(explosionSheet.animations["Explosion_Sequence_A "]);
    explosion.position.set(background.width - 100, 100);
    explosion.stop();
    explosion.loop = false;
    explosion.renderable = false;
    explosion.onComplete = function() {
        if (level == 2) {
            bronzeEgg.renderable = true;
        }
        if (level == 3) {
            silverEgg.renderable = true;
        }
        if (level == 4) {
            goldEgg.renderable = true;
        }
        explosion.renderable = false;
    };

    wrenches = new PIXI.Sprite(sheet.textures["rake.png"]);
    wrenches.scale.set(1.5);
    wrenches.position.set(WIDTH + 1, background.height - wrenchesYOffset);

    bush1 = new PIXI.Sprite(sheet.textures["bush.png"]);
    bush1.position.set(WIDTH + 1, background.height - wrenchesYOffset);
    bush1.scale.set(2);

    // add it to the stage and render!
    app.stage.addChild(wrenches);
    app.stage.addChild(suhajWalk);
    app.stage.addChild(suhajWrenches);
    app.stage.addChild(suhajJump);
    app.stage.addChild(bronzeEgg);
    app.stage.addChild(silverEgg);
    app.stage.addChild(goldEgg);
    app.stage.addChild(explosion);
    app.stage.addChild(bush1);
    app.ticker.add(delta => gameLoop(delta));

    resize(app).call();
}

function updateYs() {
    background.y = background2.y = topBackgroundOffset;
    suhajWalk.y = background.height - suhajYoffset + topBackgroundOffset;
    suhajWrenches.y = background.height - suhajYoffset + topBackgroundOffset;
    suhajJump.y = background.height - suhajYoffset + topBackgroundOffset;
    wrenches.y = background.height - wrenchesYOffset + topBackgroundOffset;
    bush1.y = background.height - bushOffset + topBackgroundOffset;
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
    background.x %= WIDTH * 2;
    if (background.x < 0) {
        background.x += WIDTH * 2;
    }
    background.x -= WIDTH;

    background2.x = -(postition * 0.5) + WIDTH;
    background2.x %= WIDTH * 2;
    if (background2.x < 0) {
        background2.x += WIDTH * 2;
    }
    background2.x -= WIDTH;

    wrenches.x -= 12;
    bush1.x -= 10;

    if (bush1.x < -360) {
        bush1.x = WIDTH + 1;
    }

    if (wrenches.x < -460) {
        wrenches.x = WIDTH + 1;
        wrenches.renderable = true;

        score += 1;

        if (score == 10 ) {
            level = 2;
            explosion.x = bronzeEgg.x;
            explosion.renderable = true;
            explosion.gotoAndPlay(0);
        } else if (score == 20 ) {
            level = 3;
            explosion.x = silverEgg.x;
            explosion.renderable = true;
            explosion.gotoAndPlay(0);
        } else if (score == 30) {
            level = 4;
            explosion.x = goldEgg.x;
            explosion.renderable = true;
            explosion.gotoAndPlay(0);
        }
    }

    if (wrenches.x > 450 && wrenches.x < 700 && suhajState == STATE_WALKING) {
        wrenchesHit();
        wrenches.renderable = false;
    }
}

function wrenchesHit() {
    suhajState = STATE_WRENCHES;
    updateSpritesByState();
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
    
    app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);

    app.renderer.resize(nvw, window.innerHeight);

    topBackgroundOffset = ((window.innerHeight - nvh) * HEIGHT) / nvh;

    updateYs();
  };
}