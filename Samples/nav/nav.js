const topNav = document.querySelector('.top-nav');
const bubble = document.querySelector('.bubble');
const blob = document.querySelector('.blob');
const navItems = document.querySelectorAll('.nav-item');
const sidebarC = document.querySelector('.links-container');

const topNavBlur = document.querySelector('.top-nav-blur');

function moveBubble(target) {
    const rect = target.getBoundingClientRect();
    const navRect = topNav.getBoundingClientRect(); // topNav should be your .top-nav element

    const side = sidebarC.getBoundingClientRect();
    // Subtract the nav's top from the target's top to get the local Y coordinate
    const topPosition = rect.top - navRect.top;
    const rightOffset = rect.right - side.right;
    console.log('Right Offset:', rightOffset, 'Top Position:', topPosition);

    const isVertical = window.innerWidth <= 768;

    if (isVertical) {
        // Vertical Calculation (Mobile)

        bubble.style.width = `${rect.width + 32}px`; // Add some padding for better aesthetics
        bubble.style.height = `${rect.height}px`;
        bubble.style.top = '0';
        bubble.style.left = 'auto';
        // bubble.style.right = '0';
        
        // We use the rightPosition to nudge it exactly where the text ends
        bubble.style.transform = `translate(${rightOffset + 16}px, ${topPosition}px)`;

        const tNDimenW = topNav.offsetWidth + 'px';
        const tNDimenH = topNav.offsetHeight + 'px';
        topNavBlur.style.width = tNDimenW;
        topNavBlur.style.height = tNDimenH;
        console.log('Blur Div Dimension: ', topNavBlur.offsetWidth, topNavBlur.offsetHeight);
    } else {
        // Horizontal Calculation (Desktop)
        // Subtract the nav's left from the target's left to get the local X coordinate
        const leftPosition = rect.left - navRect.left;

        bubble.style.height = '98%';
        bubble.style.width = `${rect.width}px`;
        // Centering vertically (-50%) while moving horizontally
        bubble.style.transform = `translate(${leftPosition}px, -50%)`;
        bubble.style.top = '50%';
        bubble.style.left = '0';
    }
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => moveBubble(e.currentTarget));
});

function setBubble() {
    const isVertical = window.innerWidth <= 768;
    if (isVertical) {
        const sidebarLinks = document.querySelectorAll('.links-container a');
        if (sidebarLinks.length > 0) {
            moveBubble(sidebarLinks[0]); // Move bubble to the first sidebar link
        }
    } else {
        const activeLink = document.querySelector('.nav-item.active') || navItems[0]; // Default to first link if no active class
        moveBubble(activeLink);
    }
}

window.addEventListener('load', () => {
    setBubble();
});

window.addEventListener('resize', () => {
    setBubble();
});


function hoverBlob(target) {
    const rect = target.getBoundingClientRect();
    const navRect = topNav.getBoundingClientRect(); 
    
    const leftPosition = rect.left - navRect.left;

    blob.style.width = `${rect.width}px`;
    blob.style.height = `${rect.height}px`; 
    
    // Centering the blob vertically within the 50px high nav bar
    blob.style.transform = `translate(${leftPosition + 24}px, -50%)`;
    blob.style.top = '50%';
    blob.style.left = '-50%'; // Center horizontally on the link
}
// This targets ONLY the <a> tags inside the container
const sidebarLinks = document.querySelectorAll('.links-container a');

sidebarLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        // Only run hoverBlob if we are on desktop
        if (window.innerWidth > 768) {
            hoverBlob(e.currentTarget);
        }
    });
    
    link.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            blob.style.width = '100%';
            blob.style.transform = 'translate(50%, -50%)'; // Reset to full width and centered
        }
    });
});