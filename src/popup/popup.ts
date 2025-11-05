declare const mdc: any;

console.log('Popup script loaded');

document.addEventListener('DOMContentLoaded', () => {
  const openOptionsButton = document.getElementById('openOptions');
  if (openOptionsButton) {
    openOptionsButton.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  }

  const buttons = [].map.call(document.querySelectorAll('.mdc-button'), (el: Element) => {
    return new mdc.ripple.MDCRipple(el);
  });
});