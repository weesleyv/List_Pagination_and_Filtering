
const studentsLi = document.getElementsByClassName('student-item');
const itemsToShow = 10;
const names = document.querySelectorAll('h3');

/*** 
   showPage function to hide all of the items in the 
   list except for the ten you want to show.
***/
const showPage = (list, page) => {
  let startIndex = (page * itemsToShow) - itemsToShow;
  let endIndex = page * itemsToShow;
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = 'list-item'
    } else {
      list[i].style.display = 'none';
    }
  }
}

/*** 
   appendPageLinks function to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = list => {
  const divContainer = document.querySelector('.page');
  const div = document.createElement('div');
  div.className = 'pagination';
  divContainer.appendChild(div);
  
  const ul = document.createElement('ul');
  div.appendChild(ul);

  const pages = Math.floor(list.length / itemsToShow) + 1; // how many pages per list
  for (let i = 0; i < pages; i++) {   //iterating through pages to add same amount of links
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = i + 1;
    if (i === 0) {
      link.classList.add('active');
    }
    link.addEventListener('click', (e) => {     // onclick change page and remove/add class 'active' for every link
      const allLinks = document.querySelectorAll('a');
      for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove('active')
      }
      e.target.classList.add('active');
      showPage(studentsLi, e.target.textContent);
    })

    li.appendChild(link);
    ul.appendChild(li);
   
  }
}

/*** 
   searchComponent function to generate, append, and add 
   functionality to the search field.
***/
const searchComponent = () => {
  const pageHeader = document.querySelector('.page-header');
  const div = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');
  input.type = 'text';
  input.setAttribute('id', 'search-field');
  input.placeholder = 'search for students';
  button.textContent = 'search';
  pageHeader.appendChild(div);
  div.appendChild(input);
  div.appendChild(button);
  
  button.addEventListener('click',e => {
    e.preventDefault();
    searchFunc(input, names);
  })
  input.addEventListener('keyup', e => {
    searchFunc(input, names);
  })
  
}

/*** 
   removeLinks function to remove appended links
***/
const removeLinks = () => {
  const links = document.getElementsByClassName('pagination');
  for (let i = 0; i < links.length; i++) {
    links[i].parentNode.removeChild(links[i]);
  }
}

/*** 
   searchFunc function to add 
   functionality for the input field.
***/
const searchFunc = (searchInput, names) => { 
  const inputValue = searchInput.value;
  const searchResults = [];   // array to store searchResults

  for (let i = 0; i < names.length; i++) {                    //  
    let li = names[i].parentNode.parentNode;                  // iterating through names
    const namesContent = names[i].textContent.toLowerCase();  // to check if names 'includes' input value
    if (namesContent.includes(inputValue.toLowerCase())) {    //
      li.style.display = 'list-item';
      searchResults.push(li);
    } else {
      li.style.display = 'none';
    }
  }

  removeLinks();
  appendPageLinks(searchResults);
  showPage(searchResults, 1);
}

showPage(studentsLi, 1);
appendPageLinks(studentsLi);
searchComponent();





