document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const themeIcon = document.getElementById('theme-icon');
    const contactForm = document.querySelector('.contact-form form');
    const progressBar = document.getElementById('progressBar');
    const mainHeader = document.querySelector('.main-header'); // تم الإبقاء على هذا المتغير، على الرغم من أن CSS يتعامل مع "sticky" مباشرة

    // Toggle mobile menu visibility
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked or a details summary is toggled
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('summary')) { 
            setTimeout(() => { 
                if (!e.target.closest('details') || !e.target.closest('details').open) {
                    mobileMenu.classList.remove('active');
                }
            }, 100);
        }
    });

    // Theme toggle initialization (retained)
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Contact form submission (retained)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const sendButton = this.querySelector('button[type="submit"]');
        const sendText = document.getElementById('send-text');
        const loadingSpinner = document.getElementById('loading-spinner');

        sendText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        sendButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            alert('شكراً لتواصلكم معنا! تم استلام رسالتكم بنجاح.');
            this.reset();
            sendText.classList.remove('hidden');
            loadingSpinner.classList.add('hidden');
            sendButton.disabled = false;
        }, 1500);
    });

    // Scroll-to-top logic and Scroll Progress Bar (retained and integrated)
    window.addEventListener('scroll', () => {
        // Scroll to top button
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        // Update Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) { // التأكد من وجود progressBar قبل التحديث
            progressBar.style.width = scrolled + "%";
        }
    });

    // --- Tab Functionality ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    const activateTab = (tabId) => {
        // Remove active class from all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and its corresponding content
        const targetButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(`${tabId}-content`);

        if (targetButton && targetContent) {
            targetButton.classList.add('active');
            targetContent.classList.add('active');
        }
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.dataset.tab;
            activateTab(targetTabId);
        });
    });

    // Handle smooth scroll for anchor links AND tab navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1); // Get ID without '#'
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault(); // Prevent default anchor jump

                // If the link is meant to go to a specific tab
                if (this.hasAttribute('data-tab-goto')) {
                    const tabToActivateId = this.getAttribute('data-tab-goto');
                    activateTab(tabToActivateId); // Activate the target tab
                    
                    // Scroll to the section containing the tabs
                    // Assuming all tabs are within '#didactic-subjects-section'
                    const tabsSection = document.getElementById('didactic-subjects-section');
                    if (tabsSection) {
                        tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } else {
                    // Regular smooth scroll for other anchor links
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Set initial active tab based on URL hash if present on page load
    const hash = window.location.hash.substring(1);
    if (hash) {
        // If the hash matches a section ID, scroll to it
        const targetElement = document.getElementById(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Check if the hash corresponds to a tab (e.g., #arabic-tab, #math-tab)
        // If so, activate that tab
        const initialTabButton = document.querySelector(`.tab-button[data-tab="${hash}"]`);
        if (initialTabButton) {
            activateTab(hash);
            // Ensure we also scroll to the tabs section if a tab is directly linked
            const tabsSection = document.getElementById('didactic-subjects-section');
            if (tabsSection) {
                tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
});

// Global functions for theme toggle and scroll to top (can be called from HTML)
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    let currentTheme = body.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
