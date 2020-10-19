const pptr = require('puppeteer');
const timers = require('timers');
const alert = require('alert');


let counter = 0;

async function check() {
  counter += 1;

  try {
    const browser = await pptr.launch();
    const page = await browser.newPage();

    await page.goto('https://www2.ufmg.br/drca/drca/Home/Graduacao/Reopcao-de-Curso/Resultado-dos-Colegiados-de-Cursos');

    const res = await page.evaluate(() => {
      const arr = Array.from(document.getElementsByClassName('attribute-long')[0].children);
      const cc = arr.find((el) => el.innerText.includes('Computação'));
      return cc.innerHTML.includes('href');
    });

    await browser.close();

    console.log(`A consulta ${counter} cabo.`);
    return res;
  } catch (err) {
    console.log(`Eitcha rapaziada deu um biziu aqui na consulta ${counter}.`);
    return false;
  }
}

timers.setInterval(async () => {
  if(await check()) {
    alert('SAIU CARAIOOOOOOOOOOOOOOOO');
  };
}, 5000);
