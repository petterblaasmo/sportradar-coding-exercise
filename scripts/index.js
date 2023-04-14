// Create getElement function since we use this code multiple times
const getElement = (element) => document.getElementById(element);

/* Question 1 */
const widthBox = getElement("width-box"); // Get width-box from HTML id
const heightBox = getElement("height-box"); // Get height-box from HTML id

const updateBoxes = () => {
  const { innerHeight: height, innerWidth: width } = window;

  widthBox.innerHTML = `<span>Width: ${width}px</span>`;
  heightBox.innerHTML = `<span>Height: ${height}px</span>`;
};

const heightHandleClick = (event) => {
  event.preventDefault(); // Ignore default behavior
  alert("You can not left-click on this element");
};

const widthHandleClick = (event) => {
  event.preventDefault(); // Ignore default behavior
  alert("You can not right-click on this element");
};

// Set event listener on left-click
widthBox.addEventListener("click", heightHandleClick);

// Set event listener on right click
heightBox.addEventListener("contextmenu", widthHandleClick);

// Set event listener on window resize and re-call function
window.addEventListener("resize", updateBoxes);

updateBoxes(); // Run function on page render

/* Question 2 */
const colorBox = getElement("color-box"); // Get color-box from HTML id

const changeColorAfter = (delay, color) => {
  return new Promise((resolve, reject) => {
    // If delay or color are not declared, return immediately
    if (!delay || !color) return reject("ERROR: Missing parameter");

    // Set timeout of variable delay
    setTimeout(() => {
      colorBox.style.backgroundColor = color; // Change background color
      resolve(); // Resolve promise and gets ready to run next .then() call
    }, delay);
  });
};

changeColorAfter(1000, "red")
  .then(() => changeColorAfter(2000, "orange"))
  .then(() => changeColorAfter(3000, "yellow"))
  .then(() => changeColorAfter(1000, "green"))
  .then(() => changeColorAfter(4000, "blue"))
  .then(() => changeColorAfter(5000, "indigo"));

/* Question 3 */
const colorBoxAsync = getElement("color-box-async"); // Get color-box-async from HTML id

// Identical to changeColorAfter() but changed to new variable to show it works the same
const asyncChangeColorAfter = (delay, color) => {
  return new Promise((resolve, reject) => {
    if (!delay || !color) return reject("ERROR: Missing parameter");

    setTimeout(() => {
      colorBoxAsync.style.backgroundColor = color;
      resolve();
    }, delay);
  });
};

/* Create an async function and call it */
(async () => {
  await asyncChangeColorAfter(1000, "red");
  await asyncChangeColorAfter(2000, "orange");
  await asyncChangeColorAfter(3000, "yellow");
  await asyncChangeColorAfter(1000, "green");
  await asyncChangeColorAfter(4000, "blue");
  await asyncChangeColorAfter(5000, "indigo");
})();

/* Question 4 */
const movieTable = getElement("movie-table"); // Get tbody element from HTML id
const movie1 = getElement("movie-1"); // Get movie-1 from HTML id
const movie2 = getElement("movie-2"); // Get movie-2 from HTML id
const movieScore1 = getElement("movie-score-1"); // Get movie-score-1 from HTML id
const movieScore2 = getElement("movie-score-2"); // Get movie-score-2 from HTML id
const movieRatings1 = getElement("movie-ratings-1"); // Get movie-ratings-1 from HTML id
const movieRatings2 = getElement("movie-ratings-2"); // Get movie-ratings-2 from HTML id

const tvShows = [
  {
    title: "Planet Earth II",
    score: 9.5,
    year: 2016,
    numRatings: 5000,
  },
  {
    title: "Planet Earth",
    score: 9.4,
    year: 2006,
    numRatings: 5000,
  },
  {
    title: "Breaking Bad",
    score: 9.4,
    year: 2008,
    numRatings: 6000,
  },
  {
    title: "Band Of Brothers",
    score: 9.4,
    year: 2001,
    numRatings: 4900,
  },
  {
    title: "Chernobyl",
    score: 9.3,
    year: 2019,
    numRatings: 4900,
  },
  {
    title: "Jingle All The Way",
    score: 7.1,
    year: 1996,
    numRatings: 5000,
  },
  {
    title: "The Wire",
    score: 9.3,
    year: 2002,
    numRatings: 6000,
  },
];

// Sort by score, if score is equal, then sort by ratings
const sortedTvShows = tvShows.sort(
  (a, b) => b.score - a.score || b.numRatings - a.numRatings
);

const tableRows = sortedTvShows.map((tvShow, index) => {
  // Map through the array and return a table row
  return `<tr>
            <td>${index + 1}</td>
            <td>${tvShow.title}</td>
            <td>${tvShow.score} ⭐</td>
            <td>${tvShow.numRatings}</td>
            <td>${tvShow.year}</td>
          </tr>`;
});

// Manually get first two elements from the array
const [firstObject, secondObject] = sortedTvShows;

// Get the score from the object and set as innerHTML of the element
movieScore1.innerHTML = firstObject.score;
movieScore2.innerHTML = secondObject.score;

// Get the title from the object and set as innerHTML of the element
movie1.innerHTML = firstObject.title;
movie2.innerHTML = secondObject.title;

movieRatings1.innerHTML = firstObject.numRatings;
movieRatings2.innerHTML = secondObject.numRatings;

// Remove the first two items of array and display the rest (.join("") to remove the , after each row)
movieTable.innerHTML = tableRows.slice(2, -1).join("");
