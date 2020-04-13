
// create a Pixi application
let app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0xc1daf9 });

const HEIGHT = 720;
const WIDTH = 1280;

const STATE_WALKING = 1;
const STATE_JUMP_START = 2;
const STATE_JUMP_END = 3;
const STATE_JUMPING = 4;
const STATE_WRENCHES = 5;
const STATE_WON = 6;
const STATE_DEVA = 7;


window.addEventListener("resize", resize(app));

document.body.appendChild(app.view);

let animatedCapguy, walkingGuy, jumpGuyStart, jumpGuyEnd, background, background2, wrenches, bush1;

let bronzeEgg, silverEgg, goldEgg;

let topBackgroundOffset;

let suhajWalk, suhajJump, suhajWrenches, suhajSibac;

let devaDance;

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


const suhajSibacFrames = [
"assets/suhaj_sibac/suhaj_sibac_000.png",
"assets/suhaj_sibac/suhaj_sibac_001.png",
"assets/suhaj_sibac/suhaj_sibac_002.png",
"assets/suhaj_sibac/suhaj_sibac_003.png",
"assets/suhaj_sibac/suhaj_sibac_004.png",
"assets/suhaj_sibac/suhaj_sibac_005.png",
"assets/suhaj_sibac/suhaj_sibac_006.png",
"assets/suhaj_sibac/suhaj_sibac_007.png",
"assets/suhaj_sibac/suhaj_sibac_008.png",
"assets/suhaj_sibac/suhaj_sibac_009.png",
"assets/suhaj_sibac/suhaj_sibac_010.png",
"assets/suhaj_sibac/suhaj_sibac_011.png",
"assets/suhaj_sibac/suhaj_sibac_012.png",
"assets/suhaj_sibac/suhaj_sibac_013.png",
"assets/suhaj_sibac/suhaj_sibac_014.png",
"assets/suhaj_sibac/suhaj_sibac_015.png",
"assets/suhaj_sibac/suhaj_sibac_016.png",
"assets/suhaj_sibac/suhaj_sibac_017.png",
"assets/suhaj_sibac/suhaj_sibac_018.png",
"assets/suhaj_sibac/suhaj_sibac_019.png",
"assets/suhaj_sibac/suhaj_sibac_020.png",
"assets/suhaj_sibac/suhaj_sibac_021.png",
"assets/suhaj_sibac/suhaj_sibac_022.png",
"assets/suhaj_sibac/suhaj_sibac_023.png",
"assets/suhaj_sibac/suhaj_sibac_024.png",
"assets/suhaj_sibac/suhaj_sibac_025.png",
"assets/suhaj_sibac/suhaj_sibac_026.png",
"assets/suhaj_sibac/suhaj_sibac_027.png",
"assets/suhaj_sibac/suhaj_sibac_028.png",
"assets/suhaj_sibac/suhaj_sibac_029.png",
"assets/suhaj_sibac/suhaj_sibac_030.png",
"assets/suhaj_sibac/suhaj_sibac_031.png",
"assets/suhaj_sibac/suhaj_sibac_032.png",
"assets/suhaj_sibac/suhaj_sibac_033.png",
"assets/suhaj_sibac/suhaj_sibac_034.png",
"assets/suhaj_sibac/suhaj_sibac_035.png",
"assets/suhaj_sibac/suhaj_sibac_036.png",
"assets/suhaj_sibac/suhaj_sibac_037.png",
"assets/suhaj_sibac/suhaj_sibac_038.png",
"assets/suhaj_sibac/suhaj_sibac_039.png",
"assets/suhaj_sibac/suhaj_sibac_040.png",
"assets/suhaj_sibac/suhaj_sibac_041.png",
"assets/suhaj_sibac/suhaj_sibac_042.png",
"assets/suhaj_sibac/suhaj_sibac_043.png",
"assets/suhaj_sibac/suhaj_sibac_044.png",
"assets/suhaj_sibac/suhaj_sibac_045.png",
"assets/suhaj_sibac/suhaj_sibac_046.png",
"assets/suhaj_sibac/suhaj_sibac_047.png",
"assets/suhaj_sibac/suhaj_sibac_048.png",
"assets/suhaj_sibac/suhaj_sibac_049.png",
"assets/suhaj_sibac/suhaj_sibac_050.png",
"assets/suhaj_sibac/suhaj_sibac_051.png",
"assets/suhaj_sibac/suhaj_sibac_052.png",
"assets/suhaj_sibac/suhaj_sibac_053.png",
"assets/suhaj_sibac/suhaj_sibac_054.png",
"assets/suhaj_sibac/suhaj_sibac_055.png",
"assets/suhaj_sibac/suhaj_sibac_056.png",
"assets/suhaj_sibac/suhaj_sibac_057.png",
"assets/suhaj_sibac/suhaj_sibac_058.png",
"assets/suhaj_sibac/suhaj_sibac_059.png",
"assets/suhaj_sibac/suhaj_sibac_060.png",
"assets/suhaj_sibac/suhaj_sibac_061.png",
"assets/suhaj_sibac/suhaj_sibac_062.png",
"assets/suhaj_sibac/suhaj_sibac_063.png",
"assets/suhaj_sibac/suhaj_sibac_064.png",
"assets/suhaj_sibac/suhaj_sibac_065.png",
"assets/suhaj_sibac/suhaj_sibac_066.png",
"assets/suhaj_sibac/suhaj_sibac_067.png",
"assets/suhaj_sibac/suhaj_sibac_068.png",
"assets/suhaj_sibac/suhaj_sibac_069.png",
"assets/suhaj_sibac/suhaj_sibac_070.png",
"assets/suhaj_sibac/suhaj_sibac_071.png",
"assets/suhaj_sibac/suhaj_sibac_072.png",
"assets/suhaj_sibac/suhaj_sibac_073.png",
"assets/suhaj_sibac/suhaj_sibac_074.png",
"assets/suhaj_sibac/suhaj_sibac_075.png",
"assets/suhaj_sibac/suhaj_sibac_076.png",
"assets/suhaj_sibac/suhaj_sibac_077.png",
"assets/suhaj_sibac/suhaj_sibac_078.png",
"assets/suhaj_sibac/suhaj_sibac_079.png",
"assets/suhaj_sibac/suhaj_sibac_080.png",
"assets/suhaj_sibac/suhaj_sibac_081.png",
"assets/suhaj_sibac/suhaj_sibac_082.png",
"assets/suhaj_sibac/suhaj_sibac_083.png",
"assets/suhaj_sibac/suhaj_sibac_084.png",
"assets/suhaj_sibac/suhaj_sibac_085.png",
"assets/suhaj_sibac/suhaj_sibac_086.png",
"assets/suhaj_sibac/suhaj_sibac_087.png",
"assets/suhaj_sibac/suhaj_sibac_088.png",
"assets/suhaj_sibac/suhaj_sibac_089.png",
"assets/suhaj_sibac/suhaj_sibac_090.png",
"assets/suhaj_sibac/suhaj_sibac_091.png",
"assets/suhaj_sibac/suhaj_sibac_092.png",
"assets/suhaj_sibac/suhaj_sibac_093.png",
"assets/suhaj_sibac/suhaj_sibac_094.png",
"assets/suhaj_sibac/suhaj_sibac_095.png",
"assets/suhaj_sibac/suhaj_sibac_096.png",
"assets/suhaj_sibac/suhaj_sibac_097.png",
"assets/suhaj_sibac/suhaj_sibac_098.png",
"assets/suhaj_sibac/suhaj_sibac_099.png"];

// load sprite sheet image + data file, call setup() if completed
PIXI.Loader.shared
    .add("assets/background.json")
    .add("assets/suhaj_walk.json")
    .add("assets/suhaj_jump.json")
    .add("assets/suhaj_wrenches.json")
    .add("assets/explosion.json")
    .add("assets/deva_dance.json")
    .add(suhajWrenchesFrames)
    .add(suhajSibacFrames)
    .load(setup);


function setup() {
    // the sprite sheet we've just loaded:
    let sheet = PIXI.Loader.shared.resources["assets/background.json"].spritesheet;

    let suhajWalkSheet = PIXI.Loader.shared.resources["assets/suhaj_walk.json"].spritesheet;
    let suhajJumpSheet = PIXI.Loader.shared.resources["assets/suhaj_jump.json"].spritesheet;
    let suhajWrenchesSheet = PIXI.Loader.shared.resources["assets/suhaj_wrenches.json"].spritesheet;

    let devaDanceSheet = PIXI.Loader.shared.resources["assets/deva_dance.json"].spritesheet;

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
    };

    devaDance = new PIXI.AnimatedSprite(devaDanceSheet.animations["deva_dance"]);
    devaDance.position.set(background.width + 304, background.height - suhajYoffset);
    devaDance.animationSpeed = 1;
    devaDance.renderable = true;
    devaDance.scale.set(1.5);
    devaDance.loop = true;
    devaDance.anchor.set(0.22798,0.99);
    devaDance.play();

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

    suhajSibac = PIXI.AnimatedSprite.fromFrames(suhajSibacFrames);
    suhajSibac.anchor.set(0.5,0.96815)
    suhajSibac.position.set(400, background.height - suhajYoffset);
    suhajSibac.animationSpeed = 1;
    suhajSibac.renderable = false;
    suhajSibac.scale.set(1.5);
    suhajSibac.loop = false;
    suhajSibac.onComplete = function() {
        suhajSibac.gotoAndPlay(60);
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
            suhajState = STATE_WON;
            wrenches.renderable = false;
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
    app.stage.addChild(devaDance);
    app.stage.addChild(suhajSibac);
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
    suhajSibac.y = background.height - suhajYoffset + topBackgroundOffset;
    devaDance.y = background.height - suhajYoffset + topBackgroundOffset;
    wrenches.y = background.height - wrenchesYOffset + topBackgroundOffset;
    bush1.y = background.height - bushOffset + topBackgroundOffset;
}

function gameLoop(delta) {
    if (suhajWalk.x < background.width / 2) {
        suhajWalk.x = (suhajWalk.x + 3*delta) % (background.width + 200);
        suhajJump.x = suhajWalk.x;
        suhajWrenches.x = suhajWalk.x;
        suhajSibac.x = suhajWalk.x;
    }

    if (suhajState == STATE_WON) {
        if (devaDance.x > 800) {
            devaDance.x -= 2 * delta;
        }
    }

    if (suhajState == STATE_WON) {
        if (devaDance.x < 803 && devaDance.x > 800) {
            suhajWalk.renderable = false;
            suhajSibac.renderable = true;
            suhajSibac.gotoAndPlay(0);
            suhajState = STATE_DEVA;
        }
    }

    if (suhajState != STATE_DEVA) {
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

        bush1.x -= 10;

        if (bush1.x < -360) {
            bush1.x = WIDTH + 1;
        }

        if (suhajState != STATE_WON) {
            wrenches.x -= 12;
            if (wrenches.x < -460) {
                wrenches.x = WIDTH + 1;
                wrenches.renderable = true;

                score += 1;

                if (score == 5 ) {
                    level = 2;
                    explosion.x = bronzeEgg.x;
                    explosion.renderable = true;
                    explosion.gotoAndPlay(0);
                } else if (score == 10 ) {
                    level = 3;
                    explosion.x = silverEgg.x;
                    explosion.renderable = true;
                    explosion.gotoAndPlay(0);
                } else if (score == 15) {
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
    } else if (suhajState == STATE_WON) {
        suhajWalk.renderable = false;
        suhajJump.renderable = false;
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