/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let apiKey = "&appid=3dd6822b4a27c10c36dc730057180df8&units=imperial";

const generateButton = document.getElementById("generate");
const zipCode = document.getElementById("zip");
const feelings = document.getElementById("feelings");

// Output fields

const dateOutput = document.querySelector("#entryHolder #date");
const tempOutput = document.querySelector("#entryHolder #temp");
const contentOutput = document.querySelector("#entryHolder #content");

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    updateUI();
    return newData;
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

generateButton.addEventListener("click", () => {
  let zip = zipCode.value,
    content = feelings.value;

  getLocalWeatherData(zip).then((weatherInfo) => {
    if (weatherInfo.cod != 200) {
      console.error(weatherInfo.message);
      window.alert(weatherInfo.message);
    }

    let temp = weatherInfo.list[0].main.temp;

    let data = {
      zip: zip,
      content: content,
      date: newDate,
      temp: temp,
    };
    postData("/postData", data);
  });
});

async function getLocalWeatherData(zipCode) {
  return await (
    await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + apiKey
    )
  ).json();
}

/*
const showResults = (data) => {
  dateOutput.innerHTML = data.date;
  tempOutput.innerHTML = data.temp;
  contentOutput.innerHTML = data.content;
};
*/

async function updateUI() {
  let response = await fetch("/all");

  try {
    let data = await response.json();
    //console.log(data);
    dateOutput.innerHTML = data.date;
    tempOutput.innerHTML = data.temp;
    contentOutput.innerHTML = data.content;
  } catch (error) {
    dateOutput.innerHTML =
      '<strong style="color:red">Something went wrong, please try again</strong>';
    console.log("Error when updating ui : ", error);
  }
}
