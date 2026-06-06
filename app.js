const container = document.querySelector('.container');
const textarea = document.querySelector('.editor textarea');

const expand = () => container.classList.add('expanded');
const collapse = () => {
  if (!textarea.value.trim()) {
    container.classList.remove('expanded');
  }
};

container.addEventListener('click', () => expand());
textarea.addEventListener('focus', () => expand());
textarea.addEventListener('blur', () => {
  setTimeout(collapse, 150);
});

const button = document.getElementById('createNote');
button.addEventListener('click', () => {
  textarea.focus();
});
