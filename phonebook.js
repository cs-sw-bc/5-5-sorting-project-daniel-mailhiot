
// Step 1 — Data Structure
let phoneBook = [
  { name: "Jasmine", phone: "4165559999", city: "Detroit" },
  { name: "Dan", phone: "6475551234", city: "Calgary" },
  { name: "Cory", phone: "9051112222", city: "Caledonia" },
  { name: "Wilmer", phone: "4378887777", city: "Wilmington" },
  { name: "Alex", phone: "7781002001", city: "Vancouver" },
  { name: "Brianna", phone: "7781002002", city: "Surrey" },
  { name: "Chris", phone: "7781002003", city: "Burnaby" },
  { name: "Dalia", phone: "7781002004", city: "Richmond" },
  { name: "Ethan", phone: "7781002005", city: "Kelowna" },
  { name: "Farah", phone: "7781002006", city: "Victoria" },
  { name: "Gavin", phone: "7781002007", city: "Winnipeg" },
  { name: "Hana", phone: "7781002008", city: "Regina" },
  { name: "Ian", phone: "7781002009", city: "Edmonton" },
  { name: "Julia", phone: "7781002010", city: "Toronto" },
  { name: "Karan", phone: "7781002011", city: "Ottawa" },
  { name: "Lila", phone: "7781002012", city: "Montreal" },
  { name: "Marco", phone: "7781002013", city: "Halifax" },
  { name: "Nina", phone: "7781002014", city: "Quebec City" },
  { name: "Omar", phone: "7781002015", city: "Saskatoon" },
  { name: "Priya", phone: "7781002016", city: "Hamilton" },
  { name: "Quinn", phone: "7781002017", city: "London" },
  { name: "Rosa", phone: "7781002018", city: "Waterloo" },
  { name: "Stefan", phone: "7781002019", city: "Guelph" },
  { name: "Tara", phone: "7781002020", city: "Kingston" },
];


// Step 2 — CRUD Functions

function addEntry(book, entry) {
  let nextIndex = 0
  for (let i = 0; i < book.length; i++) {
    nextIndex++;
  }
  book[nextIndex] = entry; // put new entry at the next index
}

function updateEntry(book, name, newData) {
  for (let i = 0; i < book.length; i++) {
    if (book[i].name.toLowerCase() === name.toLowerCase()) { // match name, case-insensitive
      for (let key in newData) { // loop through keys in newData (eg: "phone", "city").
        book[i][key] = newData[key]; // copy each new value into the found contact. (eg: book[i]["city"] = "Toronto")
      }
      break; // stop once first match is found and updated
    }
  }
}

function deleteEntry(book, name) {
  for (let i = 0; i < book.length; i++) {
    if (book[i].name.toLowerCase() === name.toLowerCase()) {
      book.splice(i, 1); // remove 1 element at index i, which is the matching contact
      return true; // deletion successful
    }
  }
  return false; // no match found, deletion unsuccessful
}


// Step 3 — Sorting Algorithms

// Part A — Bubble Sort by Name (Ascending)
function bubbleSortByName(book) {
  // Outer loop = number of passes through the array.
  // After each pass, the largest remaining name "bubbles" to the end.
  for (let i = 0; i < book.length - 1; i++) {
    // Inner loop compares adjacent pairs.
    // "- i" skips the already-sorted items at the end.
    for (let j = 0; j < book.length - 1 - i; j++) {
      // Convert both names to lowercase for case-insensitive comparison.
      let currentName = book[j].name.toLowerCase();
      let nextName = book[j + 1].name.toLowerCase();

      // If current is alphabetically after next, swap entire objects.
      if (currentName > nextName) {
        let temp = book[j];
        book[j] = book[j + 1];
        book[j + 1] = temp;
      }
    }
  }
}

//  Part B — Selection Sort by Phone (Ascending)
function selectionSortByPhone(book) {
  // Outer loop chooses the position where the next smallest phone should go.
  for (let i = 0; i < book.length - 1; i++) {
    // Assume the current position is the smallest to start.
    let minIndex = i;

    // Inner loop searches the rest of the array for a smaller phone number.
    for (let j = i + 1; j < book.length; j++) {
      let currentPhone = Number(book[j].phone);
      let minPhone = Number(book[minIndex].phone);

      // If we find a smaller phone, remember that index.
      if (currentPhone < minPhone) {
        minIndex = j;
      }
    }

    // Swap once per outer loop (only if minIndex changed).
    if (minIndex !== i) {
      let temp = book[i];
      book[i] = book[minIndex];
      book[minIndex] = temp;
    }
  }
}


// Part C — Merge Sort by Name
// Helper function: merges two already-sorted arrays into one sorted array by name.
function merge(left, right) {
  // Final merged sorted result will be built here.
  let merged = [];

  // i points to current item in left array.
  // j points to current item in right array.
  let i = 0;
  let j = 0;

  // Compare front items from both arrays until one side runs out.
  while (i < left.length && j < right.length) {
    let leftName = left[i].name.toLowerCase();
    let rightName = right[j].name.toLowerCase();

    // If left name should come first (or ties), take from left.
    if (leftName <= rightName) {
      merged.push(left[i]);
      i++;
    } else {
      // Otherwise take from right.
      merged.push(right[j]);
      j++;
    }
  }

  // Add any leftover items from left.
  while (i < left.length) {
    merged.push(left[i]);
    i++;
  }

  // Add any leftover items from right.
  while (j < right.length) {
    merged.push(right[j]);
    j++;
  }

  return merged;
}

// Main merge sort function.
function mergeSortByName(book) {
  // Base case: arrays of size 0 or 1 are already sorted.
  // slice() returns a NEW array copy, even for base case.
  if (book.length <= 1) {
    return book.slice();
  }

  // Split array into two halves.
  let mid = Math.floor(book.length / 2);
  let leftHalf = book.slice(0, mid);
  let rightHalf = book.slice(mid);

  // Recursively sort each half.
  let sortedLeft = mergeSortByName(leftHalf);
  let sortedRight = mergeSortByName(rightHalf);

  // Merge sorted halves into one new sorted array.
  return merge(sortedLeft, sortedRight);
}


// Function calls for testing
// console.log(phoneBook);

// addEntry(phoneBook, { name: "Zara", phone: "7781002021", city: "Vancouver" });
// updateEntry(phoneBook, "zara", { phone: "6475554321", city: "Calgary" });
// deleteEntry(phoneBook, "Zara");

// bubbleSortByName(phoneBook);
// selectionSortByPhone(phoneBook);
// console.log(mergeSortByName(phoneBook));

// console.log(phoneBook);


/*
Reflection Questions

1. Which algorithm was easiest to implement?
Bubble sort was the easiest for me to understand and implement out of the three.

2. Which one was hardest to understand?
Merge sort was definitely the hardest for me. It has a lot more going on compared to the other two,
and it took me a while to understand how the recursive splitting and merging works.

3. Which sorting algorithms modify the original array?
Bubble sort and selection sort.

4. Which algorithm returns a new array?
Merge sort.

5. What is the main structural difference between merge sort and the other two?
Merge sort uses recursion to split the array into smaller parts and then uses a merge helper function 
to combine them in order, while bubble sort and selection sort use nested loops and direct swaps on a single array.

*/