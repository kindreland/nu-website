// JavaScript Document

/* Variables */
//---------------------------------------------------------------------------------------------------------
// Container for paginated items
const paginatedList = document.getElementById("paginated-list");
// Paginated items
const listItems = paginatedList.querySelectorAll("#paginated-item");
//number of items to display on page
const paginationLimit = 9;

const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const paginationNumbers = document.getElementById("pagination-numbers");


const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;
//---------------------------------------------------------------------------------------------------------

//Page Number vars
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  //page number logic	
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};


//Set Active Page Numbers
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");

    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};


//Disable Page Navigation Buttons
const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};
const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};


// Display/Hide Active Pages
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    //hide all items
    item.classList.add("hidden");
    //show only items in range
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};


//run once page is loaded (*calls all above functions)
window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  //Previous Button action
  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });
  //Next Button action
  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    //click event
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
