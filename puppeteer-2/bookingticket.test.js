const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    const timeSelector = ".movie-seances__time-block";
    await page.waitForSelector(timeSelector, { visible: true });
  });

  test("Successful booking one standard place", async () => {
    await clickElement(
      page,
      "section:nth-child(2) > div:nth-child(3) > ul > li:nth-child(2)"
    );
    await clickElement(
      page,
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(1)"
    );
    await clickElement(page, "button", { name: "Забронировать" });
    const actual = await getText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });
  test("Successful booking more then one standard place", async () => {
    await clickElement(
      page,
      "section:nth-child(2) > div:nth-child(3) > ul > li:nth-child(2)"
    );
    await clickElement(
      page,
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(5) > span:nth-child(1)"
    );
    await clickElement(
      page,
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(4)"
    );
    await clickElement(page, "button", { name: "Забронировать" });
    const actual = await getText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

  test.only("Unsuccessful booking busy standard place", async () => {
    await clickElement(
      page,
      "section:nth-child(3) > div.movie-seances__hall > ul > li > a"
    );
    await clickElement(
      page,
      "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(6) > span:nth-child(3)"
    );
    await page.getByRole("button", { name: "Забронировать" }).click;
    await expect(
      page.getByRole("button", { name: "Забронировать" })
    ).toBeDisabled();
  });
});

//const actual = await clickElement(page, "acceptin-button");
//expect(actual).toHaveAttribute("disabled", "true");
