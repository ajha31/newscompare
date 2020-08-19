const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const translate = require("@vitalets/google-translate-api");

const topicm = require("../models/topic");
let heading = [];
module.exports = heading;

const preparePageForTests = async (page) => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};
const start = async () => {
  let c = await (async () => {
    let browser = await puppeteer.launch({headless:false});

    let page = await browser.newPage();
    await page.setViewport({ width: 600, height: 648 });
    await preparePageForTests(page);
    await page.goto(
      "https://trends.google.com/trends/trendingsearches/daily?geo=IN",
      { waitUntil: "networkidle2", timeout: 0 }
    );
    const content = await page.evaluate(() => {
      let b = [];
      let n = document.querySelectorAll(".feed-list-wrapper").length;
      for (let j = 0; j < n; j++) {
        let a = document.querySelectorAll(".feed-list-wrapper")[j];
        let l = a.children.length;

        for (let i = 1; i < l; i++) {
          let d = {
            date: a.children[0].children[0].innerText,
            rank:
              a.children[i].children[0].children[0].children[0].children[0]
                .children[0].innerText,
            query:
              a.children[i].children[0].children[0].children[0].children[0]
                .children[1].children[0].innerText,
            searches:
              a.children[i].children[0].children[0].children[0].children[0]
                .children[1].children[1].innerText,
            type: "trending",
          };
          b.push(d);
        }
      }
      return b;
    });

    for (let i = 0; i < content.length; i++) {
      translate(content[i].query, { to: "en" })
        .then((res) => {
          content[i].query = res.text;
          // console.log(content[i].query)
        })
        .catch((err) => {
          console.error(err);
        });
    }
    await browser.close();
    return content;
  })();
  await topicm.remove({});
  await topicm.collection.insertMany(c,(err, docs)=>{
    if (err) {
      return console.error(err);
    } else {
      console.log('multiple documents inserted in topics');
    }
  });
};

start();
