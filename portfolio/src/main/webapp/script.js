// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


const BODY_ELEM = document.querySelector("body");
function theme(name) {
  if (BODY_ELEM.getAttribute("class") == name) {
      BODY_ELEM.setAttribute("class", "normal");
  } else {
      BODY_ELEM.setAttribute("class", name);
  }
}

function foldNode(id) {
  var elem = document.getElementById(id);
  if (elem.getAttribute("style") !== null) {
      elem.removeAttribute("style");
  } else {
      elem.setAttribute("style", "display: none");
  }
}

var CURRENT_ITEM = undefined;
var CURRENT_SELECTED = undefined;
function item(id) {
var itemId = "item-" + id;
if (CURRENT_ITEM !== undefined) {
  CURRENT_ITEM.setAttribute("style", "display: none");
  var old_id = CURRENT_ITEM.getAttribute("id");
  CURRENT_ITEM = undefined;
  CURRENT_SELECTED.removeAttribute("style");
  if (old_id === itemId)
    return;
}

CURRENT_ITEM = document.getElementById(itemId);
CURRENT_ITEM.removeAttribute("style");
var nodeId = "node-" + id;
CURRENT_SELECTED = document.getElementById(nodeId);
CURRENT_SELECTED.setAttribute("style", "font-weight: 600");
}
function getRandomQuote() {
  console.log('Fetching a random quote.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addQuoteToDom().
 */
function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addQuoteToDom() function.
  textPromise.then(addQuoteToDom);
}

/** Adds a random quote to the DOM. */
function addQuoteToDom(quote) {
  console.log('Adding quote to dom: ' + quote);

  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}

/**
 * The above code is organized to show each individual step, but we can use an
 * ES6 feature called arrow functions to shorten the code. This function
 * combines all of the above code into a single Promise chain. You can use
 * whichever syntax makes the most sense to you.
 */
function getRandomQuoteUsingArrowFunctions() {
  fetch('/data').then(response => response.text()).then((quote) => {
    document.getElementById('quote-container').innerText = quote;
  });
}

/**
 * Another way to use fetch is by using the async and await keywords. This
 * allows you to use the return values directly instead of going through
 * Promises.
 */
async function getRandomQuoteUsingAsyncAwait() {
  const response = await fetch('/data');
  const quote = await response.text();
  document.getElementById('quote-container').innerText = quote;
}

function getServerStats() {
  fetch('/data').then(response => response.json()).then((books) => {

    const statsListElement = document.getElementById('quote-container');
    statsListElement.innerHTML = '';
    statsListElement.appendChild(
        createListElement('First Book ' + books.get(0)));
    statsListElement.appendChild(
        createListElement('Second Book ' + books.get(1)));
  });
}
function getComments() {
  fetch('/data').then(response => response.json()).then((comments) => {
   
   const ListElement = document.getElementById('history'); 
   ListElement.innerHTML = ''; 
   for(int i = 0; i < comments.size(); i++){
        ListElement.appendChild(
            createListElement(comments.get(i));
   }
  }); 
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
