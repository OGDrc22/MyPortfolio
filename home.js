
// Example dynamic data
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


// Populate list items
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
            }, 10);
        } else {
            // Reset chart visually
            pieChart.style.background = `conic-gradient(${stats.map(s => `transparent 0% 0%`).join(', ')}, transparent 0% 100%)`;
        }
    });
}, { threshold: 0.5 });

observerChart.observe(pieChart);




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


const widthCard = document.querySelector('.project-card').offsetWidth;


document.addEventListener('click', function (e) {
    const button = e.target.closest('.left-button');
    if (!button) return;
    
    
    const project = button.closest('.projects');
    if (!project) return;


    let projectContainers;

    if (project.classList.contains('web-projects')) {
        console.log('Button in Web Projects section' + widthCard);
        projectContainers = project.querySelector('.projects-container');
        projectContainers.scrollLeft -= widthCard;
    } else if (project.classList.contains('mobile-projects')) {
        console.log('Button in Mobile Projects section');
        projectContainers = project.querySelector('.projects-container');
        projectContainers.scrollLeft -= widthCard;
    }
})


document.addEventListener('click', function (e) {
    const button = e.target.closest('.right-button');
    if (!button) return;
    
    const project = button.closest('.projects');
    if (!project) return;

    let projectContainers;

    if (project.classList.contains('web-projects')) {
        console.log('Button in Web Projects section');
        projectContainers = project.querySelector('.projects-container');
        projectContainers.scrollLeft += widthCard;
    } else if (project.classList.contains('mobile-projects')) {
        console.log('Button in Mobile Projects section');
        projectContainers = project.querySelector('.projects-container');
        projectContainers.scrollLeft += widthCard;
    }
})

const cards = document.querySelectorAll('.projects-container');

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
  rootMargin: '0px'
});

cards.forEach(card => observerCard.observe(card));

