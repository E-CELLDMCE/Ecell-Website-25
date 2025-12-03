// --- START: Image Slider Logic ---

// 1. List all your event images. This MUST match the order in your HTML thumbnails.
const eventImages = [
    '../images/Posters/Orientation.jpg',
    '../images/Posters/Pitching.jpg',
    '../images/Posters/Build_It.jpg'

];

// 2. Keep track of the currently displayed image index
let currentImageIndex = 0;
let isAnimating = false; // Prevents spam-clicking

// 3. Get references to DOM elements
let mainImageDisplay;
let thumbnails;
let galleryImages = []; // Array to hold the <img> elements

// 4. Main function to update the gallery (main image + active thumbnail)
function updateGallery(newIndex) {
    if (isAnimating || newIndex === currentImageIndex) return;
    isAnimating = true;

    const oldIndex = currentImageIndex;
    const oldPrevIndex = (oldIndex - 1 + eventImages.length) % eventImages.length;
    const oldNextIndex = (oldIndex + 1) % eventImages.length;
    
    const newPrevIndex = (newIndex - 1 + eventImages.length) % eventImages.length;
    const newNextIndex = (newIndex + 1) % eventImages.length;

    // Remove all old classes from any image that *might* have had one
    galleryImages[oldPrevIndex]?.classList.remove('is-prev', 'is-current', 'is-next');
    galleryImages[oldIndex]?.classList.remove('is-prev', 'is-current', 'is-next');
    galleryImages[oldNextIndex]?.classList.remove('is-prev', 'is-current', 'is-next');
    
    // Add new classes
    galleryImages[newPrevIndex]?.classList.add('is-prev');
    galleryImages[newIndex]?.classList.add('is-current');
    galleryImages[newNextIndex]?.classList.add('is-next');

    // Update active class on thumbnails
    if (thumbnails) {
        thumbnails[oldIndex].classList.remove('active');
        thumbnails[newIndex].classList.add('active');
    }
    
    // Update the global index
    currentImageIndex = newIndex;

    // 4. Clean up after animation
    // The timeout MUST match the CSS transition duration (0.6s = 600ms)
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

// 5. Function for arrow clicks
function navigateImage(direction) {
    let newIndex = currentImageIndex + direction;

    // Handle wrapping
    if (newIndex < 0) {
        newIndex = eventImages.length - 1; // Go to last image
    } else if (newIndex >= eventImages.length) {
        newIndex = 0; // Go to first image
    }

    updateGallery(newIndex);
}

// 6. Function for thumbnail clicks
function changeImageTo(index) {
    updateGallery(index);
}

// --- END: Image Slider Logic ---


// --- START: Original Copyright Year Logic ---

// Wait for the HTML document to be fully loaded before running any script
document.addEventListener("DOMContentLoaded", function() {
  
  // Find the span element for the year
  const yearSpan = document.getElementById("current-year");
  
  // Get the current year
  const currentYear = new Date().getFullYear();
  
  // Set the text content of the span to the current year
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  // --- Initialize Gallery Elements ---
  mainImageDisplay = document.querySelector('.main-image-display');
  thumbnails = document.querySelectorAll('.thumbnail');
  
  // --- UPDATED: Build the gallery images dynamically ---
  const numImages = eventImages.length;
  eventImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'gallery-image';
    
    // --- UPDATED: Set initial state for cover flow ---
    if (index === 0) {
        img.classList.add('is-current'); // The first image is centered
    } else if (index === 1) {
        img.classList.add('is-next'); // The second image is on the right
    } else if (index === numImages - 1) {
        img.classList.add('is-prev'); // The last image is on the left
    }
    // All other images are hidden by default (opacity 0, scale 0.5)
    
    galleryImages.push(img); // Add to our array
    mainImageDisplay.appendChild(img); // Add to the HTML
  });

  // Set initial active thumbnail
  if (thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
  }

});
