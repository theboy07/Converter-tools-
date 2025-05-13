document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.main-nav .nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', expanded);
            // Optional: Change icon
            navToggle.innerHTML = expanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Live Search/Filter Functionality
    const searchInput = document.getElementById('toolSearch');
    const toolCards = document.querySelectorAll('.tool-card');
    const toolCategories = document.querySelectorAll('.tool-category');

    if (searchInput && toolCards.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCategories = new Set();

            toolCards.forEach(card => {
                const toolName = card.querySelector('h3').textContent.toLowerCase();
                const toolDescription = card.querySelector('p').textContent.toLowerCase();
                const keywords = card.dataset.keywords ? card.dataset.keywords.toLowerCase() : '';
                
                const isVisible = toolName.includes(searchTerm) || 
                                  toolDescription.includes(searchTerm) ||
                                  keywords.includes(searchTerm);
                
                if (isVisible) {
                    card.style.display = 'flex'; // Or 'block', 'grid' depending on original display
                    // Find the parent .tool-category and add its ID to visibleCategories
                    const parentCategory = card.closest('.tool-category');
                    if (parentCategory) {
                        visibleCategories.add(parentCategory.id);
                    }
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide category sections based on visible cards
            toolCategories.forEach(category => {
                if (searchTerm === '') { // If search is empty, show all categories
                    category.style.display = 'block';
                } else {
                    // Check if any card within this category is visible
                    const hasVisibleCard = Array.from(category.querySelectorAll('.tool-card')).some(
                        card => card.style.display !== 'none'
                    );
                    category.style.display = hasVisibleCard ? 'block' : 'none';
                }
            });
        });
    }

    // Smooth scroll for internal links (like "Explore Tools")
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default if it's a true hash link, not just href="#"
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});