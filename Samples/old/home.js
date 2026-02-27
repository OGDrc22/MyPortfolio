const fadeUp = document.querySelectorAll('.fadeUp');
window.addEventListener('load', () => {
    fadeUp.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove('hidden');
            el.classList.add('show');
        }, index * 100); // Stagger the animation by 100ms for each element
    });
})

// Intersection Observer for Fade Up Animation
const observerFadeUp = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        setTimeout(() => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
                entry.target.classList.add('hidden');
            }
        }, index * 100); // Stagger the animation by 100ms for each element
    });
}, {
    threshold: 1, // Trigger when 100% of the element is visible
});
fadeUp.forEach(el => {observerFadeUp.observe(el);});



// Pie Chart Animation
const stats = [
    { name: "Laravel", value: 70, color: "#f53003" }
];

const pieChart = document.querySelector('.pie-chart');
const listContainer = document.querySelector('.list');

// Build pie chart gradient
let start = 0;
const conicSegments = stats.map(stat => {
    const end = start + stat.value;
    const segment = `${stat.color} ${start}% ${end}%`;
    start = end;
    return segment;
}).join(', ');

const value = stats[0].value;
const filledColor = stats[0].color;

pieChart.style.background = `conic-gradient(
    ${filledColor} 0% ${value}%,
    transparent ${value}% 100%
)`;



// Populate list items Pie Chart
listContainer.innerHTML = ''; 
stats.forEach(stat => {
    const item = document.createElement('div');
    item.className = 'list-item';

    item.innerHTML = `
            <div class="ic-color" style="background-color: ${stat.color};"></div>
            <span class="stat-title">${stat.name}</span>
            <span class="value">${stat.value}%</span>
        `;

    listContainer.appendChild(item);
});

const observerChart = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let current = 0;
            const target = 100;

            const interval = setInterval(() => {
                if (current > target) {
                    clearInterval(interval);
                    return;
                }

                let start = 0;
                let progressLeft = current;
                const segments = stats.map(stat => {
                    const max = stat.value;
                    const slice = Math.min(progressLeft, max);
                    const end = start + slice;
                    const segment = `${stat.color} ${start}% ${end}%`;
                    start += stat.value;
                    progressLeft -= slice;
                    return segment;
                });

                // Fill remaining area with transparent or white
                if (start < 100) {
                    segments.push(`transparent ${start}% 100%`);
                }

                pieChart.style.background = `conic-gradient(${segments.join(', ')})`;
                current++;
            }, 15);
        } else {
            // Reset chart visually
            pieChart.style.background = `conic-gradient(${stats.map(s => `transparent 0% 0%`).join(', ')}, transparent 0% 100%)`;
        }
    });
}, { threshold: 0.5 });

observerChart.observe(pieChart);
// End of Pie Chart Animation



// Bar Chart Animation
const bars = document.querySelectorAll('.bar');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
}, {
    threshold: 0.5
});

bars.forEach(bar => observer.observe(bar));
// End of Bar Chart Animation

document.addEventListener('click', function (e) {
    const button = e.target.closest('.scroll-button');
    if (!button) return;

    const module = button.closest('.hScrollModule');
    if (!module) return;

    const moduleContainers = module.querySelector('.hScroll-container');
    if (!moduleContainers) return;

    const card = moduleContainers.querySelector('.card');
    if (!card) return;

    const projectsContainer = document.querySelector('.projects-container');
    const projectsContainerStyles = window.getComputedStyle(projectsContainer);
    const cardGap = parseInt(projectsContainerStyles.gap);
    const widthCard = card.offsetWidth + cardGap;
    if (button.classList.contains('left-button')) {
        moduleContainers.scrollLeft -= widthCard;
        console.log(widthCard);
    } else if (button.classList.contains('right-button')) {
        moduleContainers.scrollLeft += widthCard;
        console.log(widthCard);
    }
});




const cards = document.querySelectorAll('.projects-container');
// Intersection Observer for Project Cards

// Card reveal animation when they come into view
const observerCard = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    } else {
      entry.target.classList.remove('reveal');
    }
  });
}, {
  threshold: 0.2, // Reveal when 20% of card is visible
});

cards.forEach(card => observerCard.observe(card));
// End of Intersection Observer for Project Cards


const card_link = document.querySelectorAll('.card-link');
const observerLink = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.9, // Trigger when 50% of the element is visible
});

card_link.forEach(link => {
    observerLink.observe(link);
});


const observerGroup = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.9, // Trigger when 50% of the element is visible
});

<<<<<<< HEAD:Samples/old/home.js
const projectGroups = document.querySelectorAll('.project-group');

projectGroups.forEach(group => {
  group.addEventListener('click', () => {
    const flyers = group.querySelectorAll('.flyer');

    flyers.forEach((flyer, index) => {
      const flyerWidth = flyer.offsetWidth + 16;

      setTimeout(() => {
        if (!flyer.classList.contains('drop-right')) {
          flyer.classList.add('drop-right');
          flyer.style.transform = `translateX(${index * flyerWidth}px)`;
          flyer.style.zIndex = 10 - index;
        } else {
          flyer.classList.remove('drop-right');
          flyer.style.transform = `translateX(0px)`;
          flyer.style.zIndex = 10 - index;
        }
      }, index * 100);
    });
  });
});
=======






var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// var projectContainers = document.querySelectorAll('.project-container');
// projectContainers.forEach(container => {
//     container.onclick = function() {
//         console.log("clicked " + img.alt);
//         modal.style.display = "block";
//         document.querySelector(".container-body").classList.add("no-scroll");
//         fetchImage();
//         console.log("2nd clicked " + img.alt);
//     }
// });

document.querySelectorAll(".projects-container").forEach(container => {
    container.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        // Find the closest project group
        const project = e.target.closest(".project-group");

        const title = project ? project.querySelector(".project-title") : null;
        const modalTitle = document.querySelector(".modal-project-title");

        // Show modal
        modal.style.display = "block";
        document.querySelector(".container-body").classList.add("no-scroll");

        clearImages(); // Clear previous images

        // Set modal content
        modalTitle.textContent = title ? title.textContent : "Project";
        var folderpath = project.dataset.path;
        fetchImage(folderpath);

        console.log("clicked " + e.target.alt);
    }
});

var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
  modal.style.display = "none";
  document.querySelector(".container-body").classList.remove("no-scroll");
}

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        modal.style.display = "none";
        document.querySelector(".container-body").classList.remove("no-scroll");
    }
});



async function fetchImage(path) {
    try {
        let images = [];
        if (path.includes("mobile")) {
            images = ["a.png", "b.png", "c.png", "d.png", "e.png", "f.png", "g.png"];
        } else if (path.includes("web")) {
            images = ["a.png", "b.png", "c.png", "d.png", "e.png", "f.png", "g.png", "h.png", "i.png"];
        }

        const container = document.getElementById('projects-container-showcase');


        images.forEach((image, index) => {
            if (path.includes("mobile")) {
                const projectCard = document.createElement("div");
                projectCard.className = "project-card card";

                const phoneDiv = document.createElement("div");
                phoneDiv.className = "phone";

                // Create aspect-ratio-box div
                const aspectBox = document.createElement("div");
                aspectBox.className = "aspect-ratio-box";

                // Create img
                const img = document.createElement("img");
                img.src = `${path}/${image}`;
                img.alt = `Project ${index + 1}`;
                // Nest structure
                aspectBox.appendChild(img);
                phoneDiv.appendChild(aspectBox);
                projectCard.appendChild(phoneDiv);

                // Append to container
                container.appendChild(projectCard);
            } else if (path.includes("web")) {
                const projectCard = document.createElement("div");
                projectCard.className = "project-cards-expanded card";

                const webDiv = document.createElement("div");
                webDiv.className = "web-expanded";

                const desktopDiv = document.createElement("div");
                desktopDiv.className = "aspect-ratio-box";

                const img = document.createElement("img");
                img.src = `${path}/${image}`;
                img.alt = `Project ${index + 1}`;

                desktopDiv.appendChild(img);
                projectCard.appendChild(desktopDiv);
                webDiv.appendChild(projectCard);

                container.appendChild(webDiv);
            }
        });

    } catch (error) {
        console.error('Error fetching images:', error);
    }
}
})
fetchImage();

function clearImages() {
    const container = document.getElementById('projects-container-showcase');
    var img = container.getElementsByTagName('img');
    if (img.src !== null) {
        container.innerHTML = ''; // Clear all content
    }
}
>>>>>>> ac2c634e8e3ee8ae75247d89f637d276516e60df:home.js
