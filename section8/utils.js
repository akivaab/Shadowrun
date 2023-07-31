import InputHandler from "./input.js";
import Player from "./player.js";

/**
 * Draw text on screen describing button inputs and states
 *
 * @export 
 * @param {CanvasRenderingContext2D} context
 * @param {InputHandler} input
 * @param {Player} player
 */
export function drawStatusText(context, input, player) {
    context.font = '28px Helvetica';
    context.fillText('Last input: ' + input.lastKey, 20, 50);
    context.fillText('Active state: ' + player.currentState.state, 20, 90);
}