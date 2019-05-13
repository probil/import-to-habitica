/**
 * @return {HTMLElement}
 */
const createButton = () => {
  const button = document.createElement('div');
  button.classList.add('flex', 'flex-wrap', 'justify-center', 'mr2');
  const innerText = document.createElement('span');
  innerText.classList.add('pl2', 'black', 'f5-ns', 'f6', 'tc');
  innerText.innerText = 'Import as TODO to Habitica!';
  button.appendChild(innerText);
  return button;
};

const bootstrap = () => {
  const lessonInfo = document.querySelector('.flex.flex-wrap.items-center.justify-start-l.justify-center');
  if(!lessonInfo) return;
  const button = createButton();
  lessonInfo.appendChild(button);
};

setTimeout(bootstrap, 3000);

document.body.style.border = "20px solid red";
