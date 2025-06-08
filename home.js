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

    const card = moduleContainers.querySelector('.card'); // or .querySelectorAll() if multiple
    if (!card) return;

    const widthCard = card.offsetWidth;
    if (button.classList.contains('left-button')) {
        moduleContainers.scrollLeft -= widthCard;
    } else if (button.classList.contains('right-button')) {
        moduleContainers.scrollLeft += widthCard;
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