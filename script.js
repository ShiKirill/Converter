const converters = document.querySelectorAll('.converter');


// a.then(response => {
//   return response.text();
// }).then(response=>{
//   console.log(JSON.parse(response));
// })

converters.forEach(item => {
  const label = item.querySelector('.label');
  const button = item.querySelector('button');
  const select = item.querySelector('.select');
  const input = item.querySelector('.check1')
  const output = item.querySelector('.check2');
  let amount = 1;
  button.disabled = true;

  input.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^\d.]/, '');
    if (input.value.trim() && select.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  select.addEventListener('input', (event)=>{
    if (event.target.value) {
      if (input.value.trim()){
        button.disabled = false;
      }
      const convertAmount = fetch(' https://api.exchangeratesapi.io/latest?base=RUB&symbols=USD,EUR');

      convertAmount.then(response => {
        if (response.status !== 200) {
          throw new Error('status is not 200');
        }
        return response.text();
      }).then(response=>{
        amount = JSON.parse(response).rates[event.target.value.toUpperCase()];
      }).catch(error=>console.error(error));

      if (event.target.value === 'usd') {
        label.textContent = 'Доллар США (USD)';
      } else if (event.target.value === 'eur') {
        label.textContent = 'Евро (EUR)';
      }
      
    } else {
      label.textContent = 'Не выбрано';
      button.disabled = true;
    }
  })


  item.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'button') {
      if (item.classList.contains('convert-from-rub')) {
        output.value = (input.value * amount).toFixed(2);
      } else if (item.classList.contains('convert-to-rub')) {
        output.value = (input.value / amount).toFixed(2);
      }

    }
  })
});