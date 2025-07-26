
const circle = document.querySelector('.circle');
const sidebar = document.querySelector('.side-navbar');
const maincontentwrapper = document.querySelector('.main-content-wrapper');
const sortbar = document.querySelector('.sort-bar a');
// const sidebarLinks = document.querySelectorAll('.side-navbar ul li a');



circle.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    circle.classList.toggle('closed');
    maincontentwrapper.classList.toggle('closed');
    // sortbar.classList.toggle('closed');

    const icon = circle.querySelector('i');
    icon.classList.toggle('fa-angle-right');
    icon.classList.toggle('fa-angle-left');

});


function voteUp() {
    fetch('/vote-up', { method: 'POST' })
        .then(response => response.text())
        .then(data => console.log(data));
}

function voteDown() {
    fetch('/vote-down', { method: 'POST' })
        .then(response => response.text())
        .then(data => console.log(data));
}




//for categories in  sortbar
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sort-bar a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // prevent default link behavior

            // remove active class from all, then add to the clicked one
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            // get the sort type
            const sortType = this.getAttribute("data-sort");

            // send POST request to our node js server
            fetch('/update-feed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sort: sortType })
            })

            .then(console.log("post request sent"))

            .then(res => res.json())

            .then(data => {
                console.log("Feed updated:", data);
                // UPDATE THE FEED STUFF
            })

            .catch(err => {
                console.error("error updating feed:", err);
            });
            
        });

    });

});



















//SUBMIT ARTICLE FOR ARTICLES PAGE

async function submitArticle() {
  const articleText = document.getElementById('article-input').value.trim();
  if (!articleText) {
    showNotification('Please enter article text.', false);
    return;
  }
  try {
    const response = await fetch('http://localhost:5501/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: articleText })
    });
    const data = await response.json();
    const resultElement = document.getElementById('trust-result');
    if (data.error) {
      resultElement.textContent = 'Error: ' + data.error;
      resultElement.style.color = '#FF6B6B'; // Red for error
    } else {
      resultElement.textContent = `Trust Score: ${data.trust_index} - ${data.message}`;
      resultElement.style.color = data.trust_index >= 0.75 ? '#6BCB77' : '#FF6B6B'; // Green for high, red for low
    }
    openModal('trust-score-modal');
    document.getElementById('article-input').value = '';
  } catch (error) {
    document.getElementById('trust-result').textContent = 'Failed to connect to the server.';
    document.getElementById('trust-result').style.color = '#FF6B6B';
    openModal('trust-score-modal');
  }
}

function showNotification(message, isSuccess) {
  const resultElement = document.getElementById('trust-result');
  resultElement.textContent = message;
  resultElement.style.color = isSuccess ? '#6BCB77' : '#FF6B6B';
  openModal('trust-score-modal');
}



