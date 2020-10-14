const pptr = require('puppeteer');
const timers = require('timers');
const alert = require('alert');


async function check() {
  const browser = await pptr.launch();
  const page = await browser.newPage();

  await page.goto('https://www2.ufmg.br/drca/drca/Home/Graduacao/Reopcao-de-Curso/Resultado-dos-Colegiados-de-Cursos');

  const res = await page.evaluate(() => {
    const arr = Array.from(document.getElementsByClassName('attribute-long')[0].children);
    const cc = arr.find((el) => el.innerText.includes('Computação'));
    return cc.innerHTML.includes('href');
  });

  browser.close();

  return res;
}

timers.setInterval(async () => {
  if(await check()) {
    alert('SAIU CARAIOOOOOOOOOOOOOOOO');
  };
}, 5000);
