import { getLuminance, darken } from 'polished';

/**
 * Helps decide whether text should be white or black, depending
 * on the background color it's on.
 */
export function getContrastedTextColor(bgColor: string) {
    return getLuminance(bgColor) < .5 ? 'white' : 'black';
}