document.addEventListener('DOMContentLoaded', () => {
    // Initialize Supabase
    const supabaseUrl = 'https://juyiwpyvzumcaqyfhywc.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1eWl3cHl2enVtY2FxeWZoeXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNTU2NDUsImV4cCI6MjA2OTYzMTY0NX0.wCm7cjrYuthREMdcjPBylIIfvJ08DXAwXSc2HLe85L4';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    
    // Enhanced Typewriter Loading Effect
    const typewriterText = document.getElementById('typewriter-text');
    const text = "JIIT";
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            typewriterText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 300);
        } else {
            // After typing JIIT, hide the loader and show the Ride Hack popup
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Show Ride Hack popup after loader disappears
                    setTimeout(() => {
                        showRideHackPopup();
                    }, 500);
                }, 500);
            }, 1500);
        }
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);
    
    // 3D Interactive Video Banner
    const hero3dContainer = document.getElementById('hero3dContainer');
    const hero3dScene = document.getElementById('hero3dScene');
    
    // Initialize Three.js scene
    let scene, camera, renderer, particles;
    
    function init3DBanner() {
        // Create scene
        scene = new THREE.Scene();
        
        // Create camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        hero3dScene.appendChild(renderer.domElement);
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x0056b3, // Updated color to match new palette
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Mesh
        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
        
        // Mouse movement interaction
        document.addEventListener('mousemove', onDocumentMouseMove);
        
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
        // Start animation
        animate();
    }
    
    function onDocumentMouseMove(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Rotate particles based on mouse position
        if (particles) {
            particles.rotation.x = mouseY * 0.5;
            particles.rotation.y = mouseX * 0.5;
        }
    }
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    function animate() {
        requestAnimationFrame(animate);
        
        // Auto-rotate particles slowly
        if (particles) {
            particles.rotation.x += 0.001;
            particles.rotation.y += 0.001;
        }
        
        renderer.render(scene, camera);
    }
    
    // Initialize 3D banner when page loads
    init3DBanner();
    
    // Enhanced Dynamic cube that follows cursor
    const aboutCube = document.getElementById('aboutCube');
    const aboutVisual = document.querySelector('.about-visual');
    
    // Variables for cube auto-rotation
    let isAutoRotating = true;
    let autoRotateX = 0;
    let autoRotateY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Auto-rotation function
    function autoRotateCube() {
        if (isAutoRotating) {
            autoRotateX += 0.005;
            autoRotateY += 0.005;
            aboutCube.style.transform = `rotateX(${autoRotateX * 30}deg) rotateY(${autoRotateY * 30}deg)`;
        }
        requestAnimationFrame(autoRotateCube);
    }
    
    // Start auto-rotation
    autoRotateCube();
    
    // Add mouse move event listener to the about visual section
    aboutVisual.addEventListener('mousemove', (e) => {
        isAutoRotating = false;
        
        // Get the position of the about visual element
        const rect = aboutVisual.getBoundingClientRect();
        
        // Calculate the center of the about visual element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate the mouse position relative to the center
        mouseX = (e.clientX - centerX) / (rect.width / 2);
        mouseY = (e.clientY - centerY) / (rect.height / 2);
        
        // Smooth transition to target rotation
        targetX = mouseY * 30; // Max rotation of 30 degrees
        targetY = mouseX * 30; // Max rotation of 30 degrees
        
        // Apply the rotation to the cube
        aboutCube.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)`;
    });
    
    // Reset cube rotation when mouse leaves the about visual section
    aboutVisual.addEventListener('mouseleave', () => {
        isAutoRotating = true;
        // Reset auto-rotation values to current position for smooth transition
        autoRotateX = targetX / 30;
        autoRotateY = targetY / 30;
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    aboutVisual.addEventListener('touchstart', (e) => {
        isAutoRotating = false;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    aboutVisual.addEventListener('touchmove', (e) => {
        if (!isAutoRotating) {
            const rect = aboutVisual.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            // Calculate the touch position relative to the center
            const touchDiffX = (touchX - centerX) / (rect.width / 2);
            const touchDiffY = (touchY - centerY) / (rect.height / 2);
            
            // Apply the rotation to the cube
            targetX = touchDiffY * 30; // Max rotation of 30 degrees
            targetY = touchDiffX * 30; // Max rotation of 30 degrees
            
            aboutCube.style.transform = `rotateX(${targetX}deg) rotateY(${targetY}deg)`;
        }
    });
    
    aboutVisual.addEventListener('touchend', () => {
        isAutoRotating = true;
        // Reset auto-rotation values to current position for smooth transition
        autoRotateX = targetX / 30;
        autoRotateY = targetY / 30;
    });
    
    // Enhanced Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Enhanced Ride Hack Popup Modal
    const ridehackPopupModal = document.getElementById('ridehackPopupModal');
    const ridehackPopupClose = document.getElementById('ridehackPopupClose');
    const ridehackPopupRegister = document.getElementById('ridehackPopupRegister');
    const ridehackPopupLearn = document.getElementById('ridehackPopupLearn');
    
    function showRideHackPopup() {
        ridehackPopupModal.classList.add('active');
    }
    
    function closeRideHackPopup() {
        ridehackPopupModal.classList.remove('active');
    }
    
    ridehackPopupClose.addEventListener('click', closeRideHackPopup);
    
    ridehackPopupRegister.addEventListener('click', () => {
        closeRideHackPopup();
        showSimpleComingSoonModal();
    });
    
    ridehackPopupLearn.addEventListener('click', (e) => {
        e.preventDefault();
        closeRideHackPopup();
        showRideHackPage();
    });
    
    // Enhanced Success modal
    const successModal = document.getElementById('successModal');
    const successClose = document.getElementById('successClose');
    const successButton = document.getElementById('successButton');
    
    function showSuccessModal() {
        successModal.classList.add('active');
    }
    
    function closeSuccessModal() {
        successModal.classList.remove('active');
    }
    
    successClose.addEventListener('click', closeSuccessModal);
    successButton.addEventListener('click', closeSuccessModal);
    
    // Enhanced Coming Soon modal
    const comingSoonModal = document.getElementById('comingSoonModal');
    const comingSoonClose = document.getElementById('comingSoonClose');
    const comingSoonButton = document.getElementById('comingSoonButton');
    
    function showComingSoonModal() {
        comingSoonModal.classList.add('active');
        startCountdown();
    }
    
    function closeComingSoonModal() {
        comingSoonModal.classList.remove('active');
    }
    
    comingSoonClose.addEventListener('click', closeComingSoonModal);
    comingSoonButton.addEventListener('click', () => {
        closeComingSoonModal();
        showSuccessModal();
    });
    
    // Enhanced Simple Coming Soon modal
    const simpleComingSoonModal = document.getElementById('simpleComingSoonModal');
    const simpleComingSoonClose = document.getElementById('simpleComingSoonClose');
    const simpleComingSoonButton = document.getElementById('simpleComingSoonButton');
    const registerBtn = document.getElementById('registerBtn');
    
    function showSimpleComingSoonModal() {
        simpleComingSoonModal.classList.add('active');
    }
    
    function closeSimpleComingSoonModal() {
        simpleComingSoonModal.classList.remove('active');
    }
    
    simpleComingSoonClose.addEventListener('click', closeSimpleComingSoonModal);
    simpleComingSoonButton.addEventListener('click', closeSimpleComingSoonModal);
    
    // Enhanced Countdown timer
    function startCountdown() {
        // Set the date we're counting down to (30 days from now)
        const countDownDate = new Date();
        countDownDate.setDate(countDownDate.getDate() + 30);
        
        // Update the count down every 1 second
        const countdownInterval = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the count down date
            const distance = countDownDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            document.getElementById("days").textContent = days.toString().padStart(2, '0');
            document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
            
            // If the count down is finished, clear the interval
            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById("days").textContent = "00";
                document.getElementById("hours").textContent = "00";
                document.getElementById("minutes").textContent = "00";
                document.getElementById("seconds").textContent = "00";
            }
        }, 1000);
    }
    
    // Enhanced Event Countdown Timer (for Ride Hack 25)
    function startEventCountdown() {
        // Set the date we're counting down to (November 1, 2025)
        const eventDate = new Date("November 1, 2025 09:00:00").getTime();
        
        // Update the count down every 1 second
        const eventCountdownInterval = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();
            
            // Find the distance between now and the event date
            const distance = eventDate - now;
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            document.getElementById("eventDays").textContent = days.toString().padStart(2, '0');
            document.getElementById("eventHours").textContent = hours.toString().padStart(2, '0');
            document.getElementById("eventMinutes").textContent = minutes.toString().padStart(2, '0');
            document.getElementById("eventSeconds").textContent = seconds.toString().padStart(2, '0');
            
            // If the count down is finished, clear the interval
            if (distance < 0) {
                clearInterval(eventCountdownInterval);
                document.getElementById("eventDays").textContent = "00";
                document.getElementById("eventHours").textContent = "00";
                document.getElementById("eventMinutes").textContent = "00";
                document.getElementById("eventSeconds").textContent = "00";
            }
        }, 1000);
    }
    
    // Start event countdown when page loads
    startEventCountdown();
    
    // Enhanced Form submissions with Supabase integration
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            first_name: document.getElementById('firstName').value,
            last_name: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            created_at: new Date().toISOString()
        };
        
        try {
            // Insert data into Supabase
            const { data, error } = await supabase
                .from('contacts')
                .insert([formData]);
                
            if (error) {
                throw error;
            }
            
            // Show success modal
            showSuccessModal();
            contactForm.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your message. Please try again.');
        }
    });
    
    // Enhanced Navigation to pages
    const contactPage = document.getElementById('contactPage');
    const mainContent = document.getElementById('mainContent');
    const backToHome = document.getElementById('backToHome');
    
    const teamPage = document.getElementById('teamPage');
    const backToHomeFromTeam = document.getElementById('backToHomeFromTeam');
    
    // Gallery navigation
    const galleryPage = document.getElementById('galleryPage');
    const backToHomeFromGallery = document.getElementById('backToHomeFromGallery');
    
    // Updates navigation
    const updatesPage = document.getElementById('updatesPage');
    const backToHomeFromUpdates = document.getElementById('backToHomeFromUpdates');
    
    // About page navigation
    const aboutPage = document.getElementById('aboutPage');
    const backToHomeFromAbout = document.getElementById('backToHomeFromAbout');
    
    // Events page navigation
    const eventsPage = document.getElementById('eventsPage');
    const backToHomeFromEvents = document.getElementById('backToHomeFromEvents');
    
    // Ride Hack event detail page navigation
    const rideHackPage = document.getElementById('rideHackPage');
    const rideHackDetailBtn = document.getElementById('rideHackDetailBtn');
    const backToHomeFromRideHack = document.getElementById('backToHomeFromRideHack');
    const rideHackRegisterBtn = document.getElementById('rideHackRegisterBtn');
    
    // Events page buttons
    const eventsPageRegisterBtn = document.getElementById('eventsPageRegisterBtn');
    const eventsPageRideHackDetailBtn = document.getElementById('eventsPageRideHackDetailBtn');
    
    // Function to reset all active states
    function resetActiveStates() {
        // Remove active class from all pages
        contactPage.classList.remove('active');
        teamPage.classList.remove('active');
        galleryPage.classList.remove('active');
        updatesPage.classList.remove('active');
        aboutPage.classList.remove('active');
        eventsPage.classList.remove('active');
        rideHackPage.classList.remove('active');
        
        // Hide main content
        mainContent.style.display = 'none';
    }
    
    function showContactPage() {
        resetActiveStates();
        contactPage.classList.add('active');
        window.scrollTo(0, 0);
        updateActiveNav('contact');
    }
    
    function showTeamPage() {
        resetActiveStates();
        teamPage.classList.add('active');
        window.scrollTo(0, 0);
        updateActiveNav('team');
    }
    
    function showGalleryPage() {
        resetActiveStates();
        galleryPage.classList.add('active');
        window.scrollTo(0, 0);
        updateActiveNav('gallery');
    }
    
    function showUpdatesPage() {
        resetActiveStates();
        updatesPage.classList.add('active');
        window.scrollTo(0, 0);
        updateActiveNav('updates');
    }
    
    function showAboutPage() {
        resetActiveStates();
        aboutPage.classList.add('active');
        window.scrollTo(0, 0);
        updateActiveNav('about');
    }
    
    function showEventsPage() {
        resetActiveStates();
        eventsPage.classList.add('active');
        window.scrollTo(0, 0);
        updateActiveNav('events');
    }
    
    function showRideHackPage() {
        resetActiveStates();
        rideHackPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    function showMainContent() {
        // Remove active class from all pages
        contactPage.classList.remove('active');
        teamPage.classList.remove('active');
        galleryPage.classList.remove('active');
        updatesPage.classList.remove('active');
        aboutPage.classList.remove('active');
        eventsPage.classList.remove('active');
        rideHackPage.classList.remove('active');
        
        // Show main content
        mainContent.style.display = 'block';
        window.scrollTo(0, 0);
        updateActiveNav('home');
    }
    
    // Function to update active navigation
    function updateActiveNav(page) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page nav links
        const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        const activeMobileLink = document.querySelector(`.mobile-nav-link[data-page="${page}"]`);
        if (activeMobileLink) {
            activeMobileLink.classList.add('active');
        }
    }
    
    // Add event listeners for navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            
            switch(page) {
                case 'home':
                    showMainContent();
                    break;
                case 'about':
                    showAboutPage();
                    break;
                case 'events':
                    showEventsPage();
                    break;
                case 'gallery':
                    showGalleryPage();
                    break;
                case 'updates':
                    showUpdatesPage();
                    break;
                case 'team':
                    showTeamPage();
                    break;
                case 'contact':
                    showContactPage();
                    break;
            }
        });
    });
    
    // Add event listeners for back buttons
    if (backToHome) {
        backToHome.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    }
    
    if (backToHomeFromTeam) {
        backToHomeFromTeam.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    }
    
    if (backToHomeFromGallery) {
        backToHomeFromGallery.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    }
    
    if (backToHomeFromUpdates) {
        backToHomeFromUpdates.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    }
    
    if (backToHomeFromAbout) {
        backToHomeFromAbout.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    }
    
    if (backToHomeFromEvents) {
        backToHomeFromEvents.addEventListener('click', (e) => {
            e.preventDefault();
            showMainContent();
        });
    }
    
    // Ride Hack event detail navigation
    if (rideHackDetailBtn) {
        rideHackDetailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showRideHackPage();
        });
    }
    
    if (backToHomeFromRideHack) {
        backToHomeFromRideHack.addEventListener('click', (e) => {
            e.preventDefault();
            showEventsPage();
        });
    }
    
    if (rideHackRegisterBtn) {
        rideHackRegisterBtn.addEventListener('click', () => {
            showSimpleComingSoonModal();
        });
    }
    
    // Events page buttons
    if (eventsPageRegisterBtn) {
        eventsPageRegisterBtn.addEventListener('click', () => {
            showSimpleComingSoonModal();
        });
    }
    
    if (eventsPageRideHackDetailBtn) {
        eventsPageRideHackDetailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showRideHackPage();
        });
    }
    
    // Register button
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSimpleComingSoonModal();
        });
    }
    
    // Enhanced Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Enhanced Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Enhanced Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input').value;
            
            try {
                // Insert data into Supabase
                const { data, error } = await supabase
                    .from('newsletter_subscribers')
                    .insert([{ email, created_at: new Date().toISOString() }]);
                    
                if (error) {
                    throw error;
                }
                
                // Show success modal
                showSuccessModal();
                newsletterForm.reset();
            } catch (error) {
                console.error('Error subscribing to newsletter:', error);
                alert('There was an error subscribing to the newsletter. Please try again.');
            }
        });
    }
    
    // Gallery Lightbox Functionality
    const galleryLightboxModal = document.getElementById('galleryLightboxModal');
    const galleryLightboxImage = document.getElementById('galleryLightboxImage');
    const galleryLightboxClose = document.getElementById('galleryLightboxClose');
    const galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
    const galleryLightboxNext = document.getElementById('galleryLightboxNext');
    
    // Gallery images array
    const galleryImages = [
        'WhatsApp Image 2025-08-08 at 18.48.29.jpeg',
        'WhatsApp Image 2025-08-08 at 18.57.08-2.jpeg',
        'WhatsApp Image 2025-08-08 at 18.57.08-3.jpeg',
        'WhatsApp Image 2025-08-08 at 18.57.08.jpeg',
        'WhatsApp Image 2025-08-08 at 18.57.09-2.jpeg',
        'WhatsApp Image 2025-08-08 at 18.48.30.jpeg',
        'WhatsApp Image 2025-08-08 at 19.20.11.jpeg',
        'WhatsApp Image 2025-08-08 at 19.20.12-2.jpeg',
        'WhatsApp Image 2025-08-08 at 19.20.09.jpeg',
        'WhatsApp Image 2025-08-08 at 18.57.09.jpeg',
        'WhatsApp Image 2025-08-08 at 19.20.12-3.jpeg',
        'WhatsApp Image 2025-08-08 at 19.20.12.jpeg'
    ];
    
    let currentImageIndex = 0;
    
    // Open gallery lightbox
    function openGalleryLightbox(index) {
        currentImageIndex = index;
        galleryLightboxImage.src = galleryImages[currentImageIndex];
        galleryLightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close gallery lightbox
    function closeGalleryLightbox() {
        galleryLightboxModal.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    }
    
    // Show previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        galleryLightboxImage.src = galleryImages[currentImageIndex];
    }
    
    // Show next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        galleryLightboxImage.src = galleryImages[currentImageIndex];
    }
    
    // Add event listeners to gallery view buttons
    document.querySelectorAll('.gallery-view-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            openGalleryLightbox(index);
        });
    });
    
    // Add event listeners to gallery lightbox controls
    galleryLightboxClose.addEventListener('click', closeGalleryLightbox);
    galleryLightboxPrev.addEventListener('click', showPrevImage);
    galleryLightboxNext.addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside the image
    galleryLightboxModal.addEventListener('click', (e) => {
        if (e.target === galleryLightboxModal) {
            closeGalleryLightbox();
        }
    });
    
    // Keyboard navigation for gallery lightbox
    document.addEventListener('keydown', (e) => {
        if (galleryLightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeGalleryLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    // What We Do section buttons
    document.querySelectorAll('.whatwedo-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showSimpleComingSoonModal();
        });
    });
    
    // Initialize page
    showMainContent();
});
