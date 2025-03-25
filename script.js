document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        const menuList = document.getElementById('menuList');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        const crossIcon = document.querySelector('.cross-icon');
        
        hamburger.addEventListener('click', () => {
            menuList.classList.toggle('active');
            hamburgerIcon.classList.toggle('active');
            crossIcon.classList.toggle('active');
            document.body.style.overflow = menuList.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Contact Form Handling
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Validate form first
            if (!validateForm()) {
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Show submitting message
            alert('Submitting your message... Please wait.');

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Message sent successfully! Thank you for contacting me.');
                    form.reset();
                } else {
                    throw new Error('Server responded with error');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again later or contact me directly at naveedeng449@gmail.com');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Initialize skill progress bars
    initSkillBars();

    function validateForm() {
        const name = document.querySelector('input[name="name"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const message = document.querySelector('textarea[name="message"]').value.trim();

        if (!name) {
            alert('Please enter your name.');
            return false;
        }

        if (!email) {
            alert('Please enter your email address.');
            return false;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address (e.g., example@domain.com).');
            return false;
        }

        if (!message) {
            alert('Please enter your message.');
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function initSkillBars() {
        const skills = document.querySelectorAll('.skill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.querySelector('.progress');
                    const progressValue = entry.target.getAttribute('data-progress');
                    if (progress) {
                        progress.style.width = progressValue + '%';
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skills.forEach(skill => {
            observer.observe(skill);
        });
    }
});