// console.log(data);
// 1. instead of creating the cards manually, we should use array functions to convert the data into cards

// now we need to get the data in some other way

// 1. we need to get the data from somewhere

const locationOfData = "data.json"

//calback version
function reqListener() {
  console.log("reqListener");
  const structuredData = JSON.parse(this.responseText);
  console.log("structuredData", structuredData);
}
// const req = new XMLHttpRequest();
// req.addEventListener("load", reqListener);
// req.open("GET", locationOfData);
// req.send();

//promises version

function logWhenSuccessful (response) {
  console.log("response", response);
  return response;
}

function dealWithException (err) {
  console.error(err);
}

const responsePromise = fetch(locationOfData)
responsePromise.then(logWhenSuccessful)
responsePromise.catch(dealWithException)


const courseToCard = ({
  prefix,
  number,
  title,
  url,
  desc,
  prereqs,
  credits,
}) => {
  const prereqLinks = prereqs
    .map((prereq) => `<a href="#" class="card-link">${prereq}</a>`)
    .join();
  const courseTemplate = `<div class="col">
            <div class="card" style="width: 18rem;">
              <h3 class="card-header"><a href="${url}">${title}</a></h3>
              <div class="card-body">
                <h5 class="card-title">${prefix} ${number}</h5>
                <p class="card-text">${desc}</p>
                ${prereqLinks}
                <div class="card-footer text-muted">
                  ${credits}
                </div>
              </div>
            </div>
          </div>`;
  return courseTemplate;
};
const resultsContainer = document.querySelector("#filtered-results");
const courseCards = data.items.map(courseToCard);
let filteredCourseCards = courseCards;
resultsContainer.innerHTML = filteredCourseCards.join("");
// courseCards.forEach((c) => document.write(c));

// console.log(courseCards);
// document.write(courseCards.join(''))

// 2. maybe we only show those that match the search query?
//

const filterCourseCard = (markup, query) => {
  console.log(markup, query);
  return markup.toLowerCase().includes(query.toLowerCase());
};

// const searchButton = document.getElementById("search-btn");
const searchField = document.querySelector('input[name="query-text"]');

searchField.addEventListener("input", (ev) => {
  console.log(ev);
  ev.preventDefault();
  // ev.stopPropagation();
  console.log("query text");
  
  const queryText = searchField.value;
  console.log(queryText);
  // debugger
  filteredCourseCards = courseCards.filter((card) =>
    filterCourseCard(card, queryText)
  );
  console.log('filteredCourseCards', filteredCourseCards);
  resultsContainer.innerHTML = filteredCourseCards.join("");
  updateCount();
});

// 3. we update the result count and related summary info as we filter
function updateCount() {
  const count = document.getElementById("result-count");
  const countValue = filteredCourseCards.length;
  count.innerText = `${countValue} items`;
}

updateCount();