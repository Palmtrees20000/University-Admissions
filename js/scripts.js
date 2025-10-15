

// inject current year into the footer
const dateNow = new Date();
const yearElement = document.querySelector('#year');
if (yearElement) {
    yearElement.textContent = dateNow.getFullYear();
}

// Hamburger menu functionality - ONLY for small screens
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.querySelector('a[href="#navlinks"]');
    const closeButton = document.querySelector('#navlinks > a');
    
    console.log('DOM loaded, hamburger button:', hamburgerButton, 'close button:', closeButton);
    
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', function(e) {
            // Only prevent default and handle manually on small screens
            if (window.innerWidth <= 767) { // Small screens breakpoint
                e.preventDefault();
                console.log('Hamburger clicked on small screen - jumping to navigation');
                
                // Instant jump to navigation (no smooth scrolling)
                const navSection = document.querySelector('#navlinks');
                if (navSection) {
                    navSection.scrollIntoView({ 
                        behavior: 'auto', // 'auto' means instant, no animation
                        block: 'start' 
                    });
                }
            }
            // On medium/large screens, let the default anchor behavior work
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            // Only handle on small screens
            if (window.innerWidth <= 767) {
                e.preventDefault();
                console.log('Close button clicked on small screen - jumping to top');
                
                // Instant jump to top
                const topSection = document.querySelector('#top');
                if (topSection) {
                    topSection.scrollIntoView({ 
                        behavior: 'auto', // Instant jump
                        block: 'start' 
                    });
                }
            }
        });
    }
    
    // Load and display reviews
    loadReviews();
});

// Function to create star rating display
function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star filled">★</span>';
        } else {
            stars += '<span class="star">★</span>';
        }
    }
    return stars;
}

// Function to load reviews from JSON
async function loadReviews() {
    try {
        const response = await fetch('data/reviews.json');
        const data = await response.json();
        const reviewsContainer = document.getElementById('reviewsContainer');
        
        if (reviewsContainer && data.reviews) {
            // Show only the first 6 reviews for better display
            const reviewsToShow = data.reviews.slice(0, 6);
            
            reviewsToShow.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = `review-card rating-${review.rating}`;
                
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <div class="customer-name">${review.customerName}</div>
                        <div class="rating">
                            ${createStarRating(review.rating)}
                        </div>
                    </div>
                    <div class="review-comment">"${review.comment}"</div>
                `;
                
                reviewsContainer.appendChild(reviewCard);
            });
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        // Fallback: display a message if reviews can't be loaded
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (reviewsContainer) {
            reviewsContainer.innerHTML = '<p style="text-align: center; color: #666;">Reviews are currently unavailable.</p>';
        }
    }
}