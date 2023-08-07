import Player from "./player.js";

export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
}

class State {
    /**
     * @constructor
     * @param {string} state
     */
    constructor(state) {
        this.state = state;
    }
}

export class StandingLeft extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('STANDING LEFT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 1;
        this.player.speed = 0;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'PRESS left') {
            this.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_LEFT);
        }
        else if (input === 'PRESS up') {
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class StandingRight extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('STANDING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 0;
        this.player.speed = 0;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'PRESS right') {
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_RIGHT);
        }
        else if (input === 'PRESS up') {
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class SittingLeft extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('SITTING LEFT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 4;
        this.player.frameY = 9;
        this.player.speed = 0;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.SITTING_RIGHT);
        }
        else if (input === 'RELEASE down') {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class SittingRight extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('SITTING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 4;
        this.player.frameY = 8;
        this.player.speed = 0;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.SITTING_LEFT);
        }
        else if (input === 'RELEASE down') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RunningLeft extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('RUNNING LEFT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 8;
        this.player.frameY = 7;
        this.player.speed = -this.player.maxSpeed;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'RELEASE left') {
            this.player.setState(states.STANDING_LEFT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class RunningRight extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('RUNNING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 8;
        this.player.frameY = 6;
        this.player.speed = this.player.maxSpeed;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'RELEASE right') {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class JumpingLeft extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('JUMPING LEFT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 3;
        this.player.speed = -this.player.maxSpeed * 0.5;
        if (this.player.onGround()) {
            this.player.vy -= 30;
        }
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.JUMPING_RIGHT);
        }
        else if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT);
        }
        else if (this.player.vy > 0) {
            this.player.setState(states.FALLING_LEFT);
        }
    }
}

export class JumpingRight extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('JUMPING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 2;
        this.player.speed = this.player.maxSpeed * 0.5;
        if (this.player.onGround()) {
            this.player.vy -= 30;
        }
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.JUMPING_LEFT);
        }
        else if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if (this.player.vy > 0) {
            this.player.setState(states.FALLING_RIGHT);
        }
    }
}

export class FallingLeft extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('FALLING LEFT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 5;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.FALLING_RIGHT);
        }
        else if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class FallingRight extends State {
    /**
     * @constructor
     * @param {Player} player
     */
    constructor(player) {
        super('JUMPING RIGHT');
        this.player = player;
    }
    enter() {
        this.player.maxFrame = 6;
        this.player.frameY = 4;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.FALLING_LEFT);
        }
        else if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}