const getParentContainer = () => document.querySelector('.email-prefs');
const getEmailGlobalUnsub = () => document.querySelector('input[name="globalunsub"]');
const getEmailSubCheckboxes = () => document.querySelectorAll('#email-prefs-form .item input');

export function domReady(callback) {
  if (['interactive', 'complete'].includes(document.readyState)) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

export function uncheckUnsubIndividualCheckboxes() {
  const emailSubCheckboxes = getEmailSubCheckboxes();
  emailSubCheckboxes.forEach(element => {
    element.checked = false;
  });
}

export function uncheckUnsubAllCheckbox() {
  const emailGlobalUnsub = getEmailGlobalUnsub();
  if (emailGlobalUnsub) {
    emailGlobalUnsub.checked = false;
  }
}

export function handleCheckboxChange(event) {
  if (event?.target?.type === 'checkbox' && event.target.checked) {
    if (event.target.name === 'globalunsub') {
      uncheckUnsubIndividualCheckboxes();
    } else {
      uncheckUnsubAllCheckbox();
    }
  }
}

export function initializeSubscriptionPreferences() {
  const parentContainer = getParentContainer();

  if (!document.body) {
    return false;
  } else if (parentContainer) {
    parentContainer.addEventListener('change', handleCheckboxChange);
    return true;
  }
  return false;
}

// Auto-initialize when module is loaded
domReady(() => {
  initializeSubscriptionPreferences();
});
