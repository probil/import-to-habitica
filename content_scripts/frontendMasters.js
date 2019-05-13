/**
 * @param {boolean} isLarge
 * @return {HTMLElement}
 */
const createButton = ({ isLarge }) => {
  const button = document.createElement('a');
  button.classList.add('Button', 'ButtonRed');
  if (isLarge) button.classList.add('ButtonLarge');
  button.innerText = 'Import as TODO to Habitica!';
  button.href = '#';
  return button;
};

/**
 * @return {boolean}
 */
const isLargeButtonAvailable = () => {
  return !! document.querySelector('.LessonInfo > .ButtonLarge')
};

const bootstrap = () => {
  const lessonInfo = document.querySelector('.LessonInfo');
  if(!lessonInfo) return;

  const button = createButton({
    isLarge: isLargeButtonAvailable()
  });
  lessonInfo.appendChild(button);
};

bootstrap();
