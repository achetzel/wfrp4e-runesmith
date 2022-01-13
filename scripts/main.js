import { actors, i18n, initTemplates, user, wfrp4e } from './constant.js';

Hooks.on('renderItemDirectory', (_app: ItemSheet, html: JQuery) => {
  if (user().can('ITEM_CREATE')) {
    addRuneButton(html, 'Create Rune', () => {
      CreatureGenerator.generateCreature();
    });
  }
});

function addRuneButton(
  html,
  label,
  onClick) {
  const runeButton = document.createElement('runeButton');
  runeButton.style.width = '95%';
  runeButton.innerHTML = 'Create Rune Item';
  runeButton.addEventListener('click', () => {
    onClick();
  });
  html.find('.header-actions').after(runeButton);
}