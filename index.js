const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/uk";

axios(url)
  .then((response) => {
    const html = response.data;
    //   console.log(html);
    const $ = cheerio.load(html);
    //   console.log($);

    const articles = [];

    $(".dcr-le7ii1", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");

      articles.push({
        title,
        url,
      });
    });

    console.log(articles);

    app.get("/news", (req, res) => {
      res.status(200).json(articles);
    });
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is listing on ${PORT}`));
