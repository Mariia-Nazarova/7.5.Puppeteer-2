const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { putText, getText, clickElement } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});
///ПРИМЕР ОТ НЕТОЛОГИИ////////////////////////////////////////////////////////////////
// Given("user is on {string} page", async function (string) {
//   return await this.page.goto(`https://netology.ru${string}`, {
//     setTimeout: 20000,
//   });
// });

// When("user search by {string}", async function (string) {
//   return await putText(this.page, "input", string);
// });

// Then("user sees the course suggested {string}", async function (string) {
//   const actual = await getText(this.page, "a[data-name]");
//   const expected = await string;
//   expect(actual).contains(expected);
// });

///////////////////////////////////////////////////////////////////////////////////////
Given("user is located on {string} page", async function (string) {
  return await this.page.goto(
    `https://qamid.tmweb.ru/client/index.php${string}`
  );
});

When("user chooses the movie and the time of the session", async function () {
  return await clickElement(
    this.page,
    "section:nth-child(2) > div:nth-child(3) > ul > li:nth-child(2)"
  );
});
When("user chooses standart place", async function () {
  return await clickElement(
    this.page,
    "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(1)"
  );
});

When("user chooses second standart place", async function () {
  return await clickElement(
    this.page,
    "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(4)"
  );
});

When("user click on acceptin-button", async function () {
  return await clickElement(this.page, "button");
});

Then("user sees {string} page", async function (string) {
  return await this.page.goto(
    `https://qamid.tmweb.ru/client/payment.php${string}`
  );
});

When("user chooses the session with busy place", async function () {
  return await clickElement(
    this.page,
    "section:nth-child(3) > div.movie-seances__hall > ul > li > a"
  );
});

When("user chooses busy standart place", async function () {
  return await clickElement(
    this.page,
    "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(10) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
  );
});

Then("user sees that the acceptin-button to be disabled", async function () {
  return await clickElement(this.page, "button").toBeDisabled;
});
