export const greet = () => {
  const h1 = document.getElementById('title');
  
  h1.addEventListener('click', () => {
    h1.innerHTML = 'Hello Victor';
  });
}