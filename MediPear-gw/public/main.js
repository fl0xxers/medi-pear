
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