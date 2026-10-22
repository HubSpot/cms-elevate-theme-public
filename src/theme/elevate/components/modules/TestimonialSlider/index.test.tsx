import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { buildSliderProps } from './testFixtures.js';

vi.mock('@hubspot/cms-components', () => ({ Island: () => null }));

vi.mock('./islands/TestimonialSliderIsland.js?island', () => ({ default: () => null }));

const { Component } = await import('./index.js');

function renderServerMarkup(props: Parameters<typeof Component>[0]) {
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(<Component {...props} />);
  return container;
}

describe('TestimonialSlider Component', () => {
  it.each([
    { label: 'empty slider', props: buildSliderProps([]) },
    { label: 'normal links', props: buildSliderProps(['EXTERNAL', 'CONTENT']) },
  ])('renders no extra markup without CTA links: $label', ({ props }) => {
    expect(renderServerMarkup(props).innerHTML).toBe('');
  });

  it('server-renders the hidden CTA DOM contract with the resolved link href', () => {
    const container = renderServerMarkup(buildSliderProps(['EXTERNAL', 'CALL_TO_ACTION']));
    const trigger = container.querySelector('.hs-cta-trigger-button-101');
    const wrapper = trigger?.parentElement;

    expect(wrapper?.hasAttribute('data-hubspot-wrapper-cta-id')).toBe(false);
    expect(container.querySelector('.hs-web-interactive-inline')).toBeNull();
    expect(wrapper?.hasAttribute('hidden')).toBe(true);
    expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
    expect(wrapper?.getAttribute('style')).toBe('display:none');
    expect(trigger?.className).toBe('hs-cta-trigger-button hs-cta-trigger-button-101');
    expect(trigger?.getAttribute('data-hubspot-cta-id')).toBe('101');
    expect(trigger?.getAttribute('href')).toBe('https://example.com');
    expect(container.querySelector('#hubspot-web-interactives-loader')).toBeNull();
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelectorAll('.hs-cta-trigger-button')).toHaveLength(1);
  });

  it('renders one trigger per unique CTA content id', () => {
    const props = buildSliderProps(['CALL_TO_ACTION', 'CALL_TO_ACTION', 'CALL_TO_ACTION']);
    props.groupTestimonial[1].groupLink.link.url.content_id = props.groupTestimonial[0].groupLink.link.url.content_id;
    const container = renderServerMarkup(props);

    expect(container.querySelectorAll('.hs-cta-trigger-button')).toHaveLength(2);
    expect(container.querySelectorAll('.hs-cta-trigger-button-100')).toHaveLength(1);
    expect(container.querySelectorAll('.hs-cta-trigger-button-102')).toHaveLength(1);
  });

  it('still renders a trigger when the CTA href is not hydrated', () => {
    const props = buildSliderProps(['CALL_TO_ACTION']);
    props.groupTestimonial[0].groupLink.link.url.href = '';
    const trigger = renderServerMarkup(props).querySelector('.hs-cta-trigger-button-100');

    expect(trigger).not.toBeNull();
    expect(trigger?.hasAttribute('href')).toBe(false);
  });

  it('does not render a trigger for a CTA link without a content id', () => {
    const props = buildSliderProps(['CALL_TO_ACTION']);
    props.groupTestimonial[0].groupLink.link.url.content_id = null;

    expect(renderServerMarkup(props).innerHTML).toBe('');
  });
});
