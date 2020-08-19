const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
let as = require("../config/app");
let asc = new as();

const newsmodeel = require("../models/newsmodel");
const topicm=require('../models/topic');
let abp = mongoose.model("news", newsmodeel, "abp");
let ie = mongoose.model("news", newsmodeel, "indianExpress");
let it = mongoose.model("news", newsmodeel, "indiaToday");
let indiatv = mongoose.model("news", newsmodeel, "indiatv");
let ndtv = mongoose.model("news", newsmodeel, "ndtv");
let news18 = mongoose.model("news", newsmodeel, "news18");
let quint = mongoose.model("news", newsmodeel, "quint");
let republic = mongoose.model("news", newsmodeel, "republic");
let zee = mongoose.model("news", newsmodeel, "zeenews");

let searchterm=[]
const newsession = async () => {
  // await it.remove({});
  // await abp.remove({});
  // await ie.remove({});
  // await indiatv.remove({});
  // await ndtv.remove({});
  // await news18.remove({});
  // await republic.remove({});
  // await zee.remove({});
  // await quint.remove({});
  let heading=await topicm.find({type:"trending"},{query:1,_id:0}).lean();
  searchterm=heading;
};

// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page) => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};

const start = async () => {
  await newsession();
  
  //scraping india today
  await (async () => {
    const browser = await puppeteer.launch({ headless: false });
    for (let j = 0; j < searchterm.length; j++) {
      const page = await browser.newPage();
      await preparePageForTests(page);

      await page.goto(
        `https://www.indiatoday.in/topic/${searchterm[j].query}/Story`,
        { waitUntil: "networkidle2", timeout: 0 }
      );
      await asc.autoScroll(page);

      const textContent = await page.evaluate((search) => {
        let l = document.querySelector(".view-content").children[0].children
          .length;
        if (l > 0) {
          if (l > 10) l = 10;
          let a = document.querySelector(".view-content").children[0];
          let b = [];
          for (let i = 0; i < l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link:
                  a.children[i].children[2].children[0].children[0].children[0]
                    .href,
                text:
                  a.children[i].children[2].children[0].children[0].children[0]
                    .innerText,
              },
              source: {
                link: `https://www.indiatoday.in`,
                text: a.children[i].children[4].innerText,
              },
              photo: a.children[i].children[0].children[0].children[0].src,
              information: a.children[i].children[3].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://www.indiatoday.in`,
              text: "republicworld.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      // save multiple documents to the collection referenced by Book Model
      await it.collection.insertMany(textContent, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to india today with topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
  //scraping indian express
  await (async () => {
    const browser = await puppeteer.launch();
    for (let j = 0; j < searchterm.length; j++) {
      const page = await browser.newPage();
      await preparePageForTests(page);
      await page.goto(`https://indianexpress.com/?s=${searchterm[j].query}`, {
        waitUntil: "networkidle2",
        timeout: 0,
      });
      await asc.autoScroll(page);
      const textContent = await page.evaluate((search) => {
        let l = document.querySelector(".search-result").children.length;
        if (l > 0) {
          if (l > 11) l = 10;
          let a = document.querySelector(".search-result");
          let b = [];
          for (let i = 1; i <= l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link: a.children[i].children[1].children[0].href,
                text: a.children[i].children[1].children[0].innerText,
              },
              source: {
                link: `https://indianexpress.com`,
                text: a.children[i].children[2].innerText,
              },
              photo: a.children[i].children[0].children[0].children[0].src,
              information: a.children[i].children[3].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://indianexpress.com`,
              text: " by indianexpress.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      //save multiple documents to the collection referenced by Book Model
      await ie.collection.insertMany(textContent, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to indian express on topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
  //scrapping abp
  await (async () => {
    const browser = await puppeteer.launch();

    for (let j = 0; j < searchterm.length; j++) {
      const page = await browser.newPage();
      await preparePageForTests(page);
      await page.goto(
        `https://news.abplive.com/search?s=${searchterm[j].query}&format=news`,
        { waitUntil: "networkidle2", timeout: 0 }
      );
      await asc.autoScroll(page);

      const textContent = await page.evaluate((search) => {
        let l = document.querySelector("#search_result_container").children
          .length;

        if (l > 0) {
          if (l > 10) l = 10;
          let a = document.querySelector("#search_result_container");
          let b = [];
          for (let i = 0; i < l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link: a.children[i].children[0].children[0].href,
                text: a.children[i].children[0].children[0].innerText,
              },
              source: {
                link: `https://news.abplive.com`,
                text: "today",
              },
              photo:
                a.children[i].children[0].children[0].children[0].children[0]
                  .src,
              information: "",
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://news.abplive.com`,
              text: "abplive.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      // save multiple documents to the collection referenced by news Model
      await abp.collection.insertMany(textContent, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(`multiple documents inserted to abp on ${searchterm[j].query}`);
        }
      });
    }
    await browser.close();
  })();
  //indiatv news scrapping
  await (async () => {
    let browser = await puppeteer.launch({ headless: false });
    for (let j = 0; j < searchterm.length; j++) {
      let page = await browser.newPage();
      await preparePageForTests(page);

      await page.goto(
        `https://www.indiatvnews.com/topic/${searchterm[j].query}/news`,
        { waitUntil: "networkidle2", timeout: 0 }
      );
      await asc.autoScroll(page);
      let data = await page.evaluate((search) => {
        let l = document.querySelector(".newsListfull").children.length;
        if (l > 0) {
          if (l > 10) l = 10;
          let a = document.querySelector(".newsListfull");
          let b = [];
          for (let i = 0; i < l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link: a.children[
                  i
                ].children[1].children[0].children[0].getAttribute("href"),
                text: a.children[i].children[1].children[0].innerText,
              },
              source: {
                link: "https://www.indiatvnews.com",
                text: a.children[i].children[1].children[1].innerText,
              },
              photo: a.children[i].children[0].children[0].getAttribute(
                "data-original"
              ),
              information: a.children[i].children[1].children[2].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://www.indiatvnews.com`,
              text: "https://www.indiatvnews.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      // save multiple documents to the collection referenced by Book Model
      await indiatv.collection.insertMany(data, (err, docs) => {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to indiatv with topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
  //ndtv scrapping
  await (async () => {
    let browser = await puppeteer.launch();

    for (let j = 0; j < searchterm.length; j++) {
      let page = await browser.newPage();
      await preparePageForTests(page);

      await page.goto(
        `https://www.ndtv.com/search?searchtext=${searchterm[j].query}`,
        { waitUntil: "networkidle2", timeout: 0 }
      );
      await asc.autoScroll(page);
      let data = await page.evaluate((search) => {
        let l = document.querySelector("#news_list").children[1].children[0]
          .children.length;
        if (l > 0) {
          if (l > 10) l = 10;
          let a = document.querySelector("#news_list").children[1].children[0];
          let b = [];
          for (let i = 0; i < l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link: a.children[i].children[0].children[0].href,
                text: a.children[i].children[0].children[0].title,
              },
              source: {
                link: "https://www.ndtv.com",
                text: a.children[3].children[1].innerText,
              },
              photo: a.children[i].children[2].children[0].getAttribute("src"),
              information: a.children[i].children[3].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://www.ndtv.com`,
              text: "ndtv.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      // save multiple documents to the collection referenced by news Model
      await ndtv.collection.insertMany(data, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to ndtv on topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
  //news18 scrapping
  await (async () => {
    const browser = await puppeteer.launch();
    for (let j = 0; j < searchterm.length; j++) {
      const page = await browser.newPage();
      await preparePageForTests(page);

      await page.goto(
        `https://cse.google.com/cse?oe=utf8&ie=utf8&source=uds&q=${searchterm[j].query}&safe=off&sort=&cx=017500531210951933434:xmqutf8eyba&start=0`,
        { waitUntil: "networkidle2", timeout: 0 }
      );
      await asc.autoScroll(page);

      const textContent = await page.evaluate((search) => {
        let l = document.querySelector(".gsc-expansionArea").children.length;
        if (l > 0) {
          if (l > 10) l = 10;
          let a = document.querySelector(".gsc-expansionArea");
          let b = [];
          for (let i = 0; i < l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link:
                  a.children[i].children[0].children[0].children[0].children[0]
                    .href,
                text:
                  a.children[i].children[0].children[0].children[0].innerText,
              },
              source: {
                link: `https://www.news18.com`,
                text:
                  a.children[i].children[0].children[1].children[0].innerText,
              },
              photo: a.children[
                i
              ].children[0].children[2].children[0].children[0].children[0].children[0].getAttribute(
                "src"
              ),
              information:
                a.children[i].children[0].children[2].children[1].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://www.news18.com`,
              text: "https://www.news18.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      // save multiple documents to the collection referenced by news Model
      await news18.collection.insertMany(textContent, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to news18 with topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
  //quint scrapping
  await (async () => {
    const browser = await puppeteer.launch();
    for (let j = 0; j < searchterm.length; j++) {
      const page = await browser.newPage();
      await preparePageForTests(page);
      await page.goto(`https://www.thequint.com/search?q=${searchterm[j].query}`, {
        waitUntil: "networkidle2",
        timeout: 0,
      });
      await asc.autoScroll(page);

      const textContent = await page.evaluate((search) => {
        let l = document.querySelector("._11ALQ").children.length;
        if (l > 0) {
          let a = document.querySelector("._11ALQ");
          let b = [];
          for (let i = 0; i < 8; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link:
                  a.children[i].children[0].children[1].children[0].children[0]
                    .href,
                text:
                  a.children[i].children[0].children[1].children[0].children[0]
                    .innerText,
              },
              source: {
                link: `https://www.thequint.com`,
                text:
                  a.children[i].children[0].children[1].children[0].children[1]
                    .children[0].innerText,
              },
              photo:
                a.children[i].children[0].children[1].children[1].children[0]
                  .children[0].children[0].children[0].src,
              information:
                a.children[i].children[0].children[1].children[0].children[1]
                  .children[2].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://www.thequint.com`,
              text: "the quint.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      // save multiple documents to the collection referenced by news Model
      await quint.collection.insertMany(textContent, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to quint on topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
  //republic scrapping
  await (async () => {
    const browser = await puppeteer.launch();
    for (let j = 0; j < searchterm.length; j++) {
      const page = await browser.newPage();
      await preparePageForTests(page);
      await page.goto(`https://www.republicworld.com`, {
        waitUntil: "networkidle2",
        timeout: 0,
      });
      await page.click(".ham-search-icon-trigger");
      await page.keyboard.type(searchterm[j].query);
      await page.click("#search-button-trigger");

      await page.waitFor(3000);
      await page.evaluate(() => {
        let scrollableSection = document.querySelector(
          "#searchBoxResultsScrollContainer"
        );
        scrollableSection.scrollTop = scrollableSection.offsetHeight;
      });
      await page.waitFor(3000);
      const textContent = await page.evaluate((search) => {
        let l = document.querySelector("#searchBoxResultsContainer").children
          .length;
        if (l > 0) {
          let a = document.querySelector("#searchBoxResultsContainer");
          let b = [];
          for (let i = 0; i < l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link: a.children[i].children[1].children[0].href,
                text: a.children[i].children[1].children[0].innerText,
              },
              source: {
                link: `https://www.republicworld.com`,
                text: a.children[0].children[1].children[1].innerText,
              },
              photo: a.children[i].children[0].children[0].children[0].src,
              information:
                a.children[i].children[1].children[0].children[1].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://www.republicworld.com`,
              text: "republicworld.com",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();
      //save multiple documents to the collection referenced by Book Model
      await republic.collection.insertMany(textContent, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to republic bharat on topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
  //zee news scrapping
  await (async () => {
    const browser = await puppeteer.launch();
    for (let j = 0; j < searchterm.length; j++) {
      const page = await browser.newPage();
      await preparePageForTests(page);
      await page.goto(
        `https://zeenews.india.com/google?search=${searchterm[j].query}`,
        { waitUntil: "networkidle2", timeout: 0 }
      );
      await asc.autoScroll(page);
      const textContent = await page.evaluate((search) => {
        let l = document.querySelector(".gsc-expansionArea").children.length;
        if (l > 0) {
          if (l > 10) l = 10;
          let a = document.querySelector(".gsc-expansionArea");
          let b = [];
          for (let i = 0; i < l; i++) {
            let d = {
              heading: search,
              topicNo: i,
              title: {
                link:
                  a.children[i].children[0].children[0].children[0].children[0]
                    .href,
                text:
                  a.children[i].children[0].children[0].children[0].innerText,
              },
              source: {
                link: `https://zeenews.india.com`,
                text:
                  a.children[i].children[0].children[1].children[0].innerText,
              },
              photo: a.children[
                i
              ].children[0].children[2].children[0].children[0].children[0].children[0].getAttribute(
                "src"
              ),
              information:
                a.children[i].children[0].children[2].children[1].innerText,
            };
            b.push(d);
          }
          return b;
        } else {
          let b = [];
          let d = {
            heading: search,
            topicNo: 0,
            title: {
              link: "",
              text: "nothing found on this topic",
            },
            source: {
              link: `https://zeenews.india.com`,
              text: "zeenews",
            },
            photo:
              "https://testbanktop.com/wp-content/uploads/2018/01/search_error.png",
            information: "",
          };
          b.push(d);
          return b;
        }
      }, searchterm[j].query);
      await page.close();

      //save multiple documents to the collection referenced by news Model
      await zee.collection.insertMany(textContent, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log(
            `Multiple documents inserted to zeenews on topic ${searchterm[j].query}`
          );
        }
      });
    }
    await browser.close();
  })();
};

start();


