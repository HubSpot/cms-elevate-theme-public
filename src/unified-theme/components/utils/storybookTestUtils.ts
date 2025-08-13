import { expect, fn, userEvent } from '@storybook/test';

// Sets up a click event listener with preventDefault for testing
export const setupClickTest = (element: HTMLElement) => {
  const handler = fn();

  element.addEventListener('click', event => {
    event.preventDefault();
    handler(event);
  });

  return handler;
};

// Keyboard key constants for consistent usage across tests
export const keys = {
  ENTER: '{Enter}',
  SPACE: '{Space}',
  SPACEBAR: ' ',
  ARROW_UP: '{ArrowUp}',
  ARROW_DOWN: '{ArrowDown}',
  ARROW_LEFT: '{ArrowLeft}',
  ARROW_RIGHT: '{ArrowRight}',
  ESCAPE: '{Escape}',
  TAB: '{Tab}',
} as const;

type KeyboardActivationKey = (typeof keys)[keyof typeof keys];

// Tests keyboard activation (space/enter) on an element
export const testKeyboardActivation = async (element: HTMLElement, user: ReturnType<typeof userEvent.setup>, key: KeyboardActivationKey = keys.SPACEBAR) => {
  const handler = setupClickTest(element);

  await user.keyboard(key);
  await expect(handler).toHaveBeenCalledTimes(1);

  return handler;
};
