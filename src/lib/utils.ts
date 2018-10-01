import { Dictionary } from '../interfaces/common';

const PERMA_REMOVE_CHARACTERS: Array<string> = [
  '\'', '"', '.', ',', '~', '!', '?', '<', '>', '@',
  '#', '$', '%', '^', '&', '*', '(', ')', '+', '=',
  '/', '\\', '|', '{', '}', '[', ']', '-', '--'
];

const PERMA_REMOVE_CHARACTERS_HASH: Dictionary<boolean> = PERMA_REMOVE_CHARACTERS.reduce(
  (hash: Dictionary<boolean>, char: string) => {
    hash[char] = true;
    return hash;
  }, {}
)

/**
 * Backwards compatible with the old PHP version:
 * https://github.com/dxprog/dxMusicPage/blob/master/api/apis/api.content.php#L626
 *
 * @param text The text to perma-fy
 */
export function createPerma(text: string): string {
  let chars: Array<string> = text.split('');

  // Mostly because I didn't feel like fighting the RegExp
  chars = chars.filter(char => {
    return !PERMA_REMOVE_CHARACTERS_HASH.hasOwnProperty(char);
  });
  text = text.replace(/\s\s/g, ' ').replace(/\s/g, '-');
  return text.toLowerCase();
}