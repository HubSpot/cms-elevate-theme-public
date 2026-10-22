import { describe, it, expect, vi, afterEach } from 'vitest';
import { ReactNode } from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { buildSliderProps } from '../testFixtures.js';

vi.mock('@splidejs/react-splide', () => ({ Splide: ({ children }: { children: ReactNode }) => <div>{children}</div> }));

const { default: TestimonialSlider } = await import('./TestimonialSliderIsland.js');
const { Component } = await import('../index.js');
const { renderToStaticMarkup } = await import('react-dom/server');

vi.mock('@hubspot/cms-components', () => ({ Island: () => null }));

vi.mock('./TestimonialSliderIsland.js?island', () => ({ default: () => null }));

function renderCtaSlider(openInNewTab = false, hasHref = true) {
  const props = buildSliderProps(['CALL_TO_ACTION']);
  props.groupTestimonial[0].groupLink.link.open_in_new_tab = openInNewTab;
  if (!hasHref) {
    props.groupTestimonial[0].groupLink.link.url.href = '';
  }
  const serverMarkup = document.createElement('div');
  serverMarkup.innerHTML = renderToStaticMarkup(<Component {...props} />);
  document.body.append(serverMarkup);
  const trigger = serverMarkup.querySelector<HTMLElement>('.hs-cta-trigger-button-100');
  const onTrigger = vi.fn();
  trigger.addEventListener('mouseup', onTrigger);
  const slider = render(<TestimonialSlider {...props} />);
  return { link: slider.getByRole('link', { name: 'Learn more' }), onTrigger, serverMarkup };
}

describe('TestimonialSliderIsland', () => {
  afterEach(() => {
    cleanup();
    document.body.replaceChildren();
  });

  it.each([false, true])('forwards a CTA click once without navigating (new tab: %s)', openInNewTab => {
    const { link, onTrigger } = renderCtaSlider(openInNewTab);

    fireEvent.mouseUp(link, { button: 0 });
    expect(onTrigger).not.toHaveBeenCalled();
    expect(fireEvent.click(link)).toBe(false);
    expect(onTrigger).toHaveBeenCalledTimes(1);
    expect(onTrigger.mock.calls[0][0].button).toBe(0);
    expect(link.getAttribute('target')).toBe(openInNewTab ? '_blank' : '');
  });

  it('forwards Enter to the CTA trigger once and prevents native link activation', () => {
    const { link, onTrigger } = renderCtaSlider();

    expect(fireEvent.keyDown(link, { key: 'Enter' })).toBe(false);
    expect(onTrigger).toHaveBeenCalledTimes(1);
    expect(fireEvent.keyDown(link, { key: ' ' })).toBe(true);
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('keeps an unhydrated CTA link keyboard accessible and forwards Enter', () => {
    const { link, onTrigger } = renderCtaSlider(false, false);

    expect(link.getAttribute('href')).toBe('#');
    expect(fireEvent.keyDown(link, { key: 'Enter' })).toBe(false);
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('preserves the resolved href fallback for click and Enter if the trigger is missing', () => {
    const { link, onTrigger, serverMarkup } = renderCtaSlider();
    serverMarkup.remove();

    expect(fireEvent.click(link)).toBe(true);
    expect(fireEvent.keyDown(link, { key: 'Enter' })).toBe(true);
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(onTrigger).not.toHaveBeenCalled();
  });

  it('prevents placeholder navigation if both the trigger and href are missing', () => {
    const { link, onTrigger, serverMarkup } = renderCtaSlider(false, false);
    serverMarkup.remove();

    expect(fireEvent.click(link)).toBe(false);
    expect(fireEvent.keyDown(link, { key: 'Enter' })).toBe(false);
    expect(onTrigger).not.toHaveBeenCalled();
  });

  it.each(['metaKey', 'ctrlKey', 'shiftKey'] as const)('opens the CTA popup on %s-click like native CTA triggers', modifier => {
    const { link, onTrigger } = renderCtaSlider(true);

    expect(fireEvent.click(link, { [modifier]: true })).toBe(false);
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it('leaves middle-click navigation unchanged rather than opening the popup', () => {
    const { link, onTrigger } = renderCtaSlider(true);

    expect(fireEvent.mouseUp(link, { button: 1 })).toBe(true);
    expect(fireEvent(link, new MouseEvent('auxclick', { bubbles: true, cancelable: true, button: 1 }))).toBe(true);
    expect(onTrigger).not.toHaveBeenCalled();
  });

  it.each([
    ['EXTERNAL', 'https://example.com'],
    ['CONTENT', 'https://example.com'],
    ['EMAIL_ADDRESS', 'mailto:https://example.com'],
    ['PAYMENT', 'https://example.com?referrer=CMS_MODULE_NEWTAB'],
  ] as const)('preserves %s link navigation, target, and rel', (linkType, expectedHref) => {
    const props = buildSliderProps([linkType]);
    props.groupTestimonial[0].groupLink.link.open_in_new_tab = true;
    props.groupTestimonial[0].groupLink.link.no_follow = true;
    const { getByRole } = render(<TestimonialSlider {...props} />);
    const link = getByRole('link', { name: 'Learn more' });

    expect(link.getAttribute('href')).toBe(expectedHref);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer nofollow');
    expect(fireEvent.click(link)).toBe(true);
    expect(fireEvent.keyDown(link, { key: 'Enter' })).toBe(true);
  });
});
