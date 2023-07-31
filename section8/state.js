import Player from "./player.js";

export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
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
        this.player.frameY = 1;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.STANDING_RIGHT);
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
        this.player.frameY = 0;
    }
    /**
     * @param {string} input
     */
    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}