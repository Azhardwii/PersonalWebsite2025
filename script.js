document.addEventListener("DOMContentLoaded", function() {
    
    // =================================================
    // BAGIAN KODE ANIMASI KETIK ANDA (BIARKAN SEPERTI INI)
    // =================================================
    const typingTextElement = document.getElementById('typing-text');
    const textArray = ["Azhar dwi", "UI/UX Designer"];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (textArray[textArrayIndex] === "UI/UX Designer") {
            typingTextElement.classList.add('gradient-text');
        } else {
            typingTextElement.classList.remove('gradient-text');
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000); 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 500); 
        } else {
            const typingSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typingSpeed);
        }
    }
    setTimeout(type, 500);


    // =================================================
    // ▼▼▼ TAMBAHKAN KODE HAMBURGER MENU DI SINI ▼▼▼
    // =================================================
    const hamburger = document.querySelector(".hamburger-menu");
    const navMenu = document.querySelector(".nav-links");

    // Toggle menu saat hamburger diklik
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Tutup menu saat salah satu link di dalam menu diklik
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

        // ▼▼▼ TAMBAHKAN KODE ANIMASI SCROLL DI SINI ▼▼▼
        const animatedElements = document.querySelectorAll(".animate-on-scroll");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan
                }
            });
        }, {
            threshold: 0.1 // Animasi berjalan saat 10% elemen terlihat
        });
    
        animatedElements.forEach((el, index) => {
            // 1. Efek staggered (muncul berurutan) - kita pertahankan
            el.style.transitionDelay = `${index * 50}ms`;
        
            // 2. DURASI ACAK: atur durasi animasi secara acak antara 0.8s hingga 1.5s
            const randomDuration = Math.random() * (1.5 - 0.8) + 0.8;
            el.style.transitionDuration = `${randomDuration.toFixed(2)}s`;
        
            observer.observe(el);
        });

            // ▼▼▼ TAMBAHKAN KODE NAVIGASI AKTIF DI SINI ▼▼▼
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Hapus kelas .active dari semua link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Tambahkan kelas .active ke link yang sesuai
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { 
        rootMargin: '-50% 0px -50% 0px' // Memicu di tengah layar
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ▼▼▼ TAMBAHKAN KODE ANIMASI KARTU PROYEK DI SINI ▼▼▼
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {
        // Atur delay agar muncul satu per satu
        const delay = index * 500; // Jeda 150ms antar kartu
        card.style.transitionDelay = `${delay}ms`;
    });
    // ▲▲▲ BATAS AKHIR KODE TAMBAHAN ▲▲▲

    // ======================= ACHIEVEMENTS SLIDER =======================
    const achievementSlider = new Swiper('.achievement-slider', {
        slidesPerView: 1, // Tampilkan 1 slide di mobile
        spaceBetween: 30,
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        // Aturan untuk layar yang lebih besar
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // ======================= LIGHTBOX LOGIC =======================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const achievementCards = document.querySelectorAll('.achievement-card');

    let currentImages = [];
    let currentIndex = 0;

    function showImage(index) {
        lightboxImg.src = currentImages[index];
        currentIndex = index;
        // Tampilkan/sembunyikan tombol prev/next
        lightboxPrev.style.display = index > 0 ? 'block' : 'none';
        lightboxNext.style.display = index < currentImages.length - 1 ? 'block' : 'none';
    }

    achievementCards.forEach(card => {
        card.addEventListener('click', () => {
            const imagesAttr = card.getAttribute('data-images');
            currentImages = imagesAttr.split(',');
            
            if (currentImages.length > 0 && currentImages[0]) {
                showImage(0);
                lightbox.classList.add('show');
            }
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('show');
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Tutup jika klik area gelap
            closeLightbox();
        }
    });

    lightboxNext.addEventListener('click', () => {
        if (currentIndex < currentImages.length - 1) {
            showImage(currentIndex + 1);
        }
    });

    lightboxPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    });

    // ======================= FLOATING BUTTON ON MARQUEE HOVER =======================
    const marqueeArea = document.querySelector('.footer-marquee');
    const floatingBtn = document.getElementById('floating-btn');

    if (marqueeArea && floatingBtn) {
        // Saat mouse masuk ke area marquee
        marqueeArea.addEventListener('mouseenter', () => {
            floatingBtn.classList.add('visible');
        });

        // Saat mouse keluar dari area marquee
        marqueeArea.addEventListener('mouseleave', () => {
            floatingBtn.classList.remove('visible');
        });

        // Saat mouse bergerak di dalam area marquee
        marqueeArea.addEventListener('mousemove', (e) => {
            // Update posisi tombol mengikuti kursor
            floatingBtn.style.left = `${e.clientX}px`;
            floatingBtn.style.top = `${e.clientY}px`;
        });

        // ▼▼▼ TAMBAHKAN BLOK INI ▼▼▼
        marqueeArea.addEventListener('click', () => {
            window.location.href = 'mailto:azhardwi927@gmail.com?subject=Discuss Project';
        });
    }


}); // <-- Kurung kurawal dan tutup kurung dari DOMContentLoaded