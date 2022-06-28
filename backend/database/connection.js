const express = require("express");
const axios = require("axios");

const Low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { isEmpty } = require("lodash");

const router = express.Router();

const adapter = new FileSync(__dirname + "/countries.json");
const db = new Low(adapter);

const getCountries = () => {
  return axios({
    method: "get",
    url: "https://restcountries.com/v2/all",
    //url: "https://restcountries.com/v2/name/united",
    //url: "https://restcountries.com/v3.1/name/united",
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const addDataToDb = async () => {
  await db.read();
  let countries = db.get("countries");

  if (isEmpty(countries.value())) {
    console.log("call to restcountries...");
    const fetchCountries = await getCountries();
    countries.push(...fetchCountries).write();
  }
};

router.route("/countries").get(async (req, res) => {
  await db.read();

  let countries = db.get("countries");

  const findCountry = countries
    .filter((element) => element.name.trim().toLowerCase().includes("united"))
    .value();

  res.send(findCountry);
});

router.route("/countries/find").post(async (req, res) => {
  await db.read();

  let countries = db.get("countries");

  const findCountry = countries
    .find((element) =>
      element.name
        .trim()
        .toLowerCase()
        .includes(req.body.query.trim().toLowerCase()),
    )
    .value();

  res.send(findCountry);
});

router.route("/countries").post(async (req, res) => {
  await db.read();

  let countries = db.get("countries");

  const findCountry = countries
    .filter((element) =>
      element.name
        .trim()
        .toLowerCase()
        .includes(req.body.query?.trim().toLowerCase()),
    )
    .value();

  res.send(findCountry);
});

addDataToDb();

module.exports = router;
