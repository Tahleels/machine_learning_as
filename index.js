import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Generates a random date between April 1, 2026 and September 24, 2026 (April - September 2026)
const getRandomDate = () => {
  const startDate = moment("2026-04-01T00:00:00");
  const endDate = moment("2026-09-24T23:59:59");
  const daysDiff = endDate.diff(startDate, "days");

  const randomDays = random.int(0, daysDiff);
  const randomHours = random.int(0, 23);
  const randomMinutes = random.int(0, 59);
  const randomSeconds = random.int(0, 59);

  return startDate
    .clone()
    .add(randomDays, "days")
    .add(randomHours, "hours")
    .add(randomMinutes, "minutes")
    .add(randomSeconds, "seconds")
    .format();
};

const markCommit = (dateStr) => {
  const date = dateStr || getRandomDate();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const date = getRandomDate();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);

