document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Glow Cursor Tracker
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'custom-cursor-glow hidden md:block';
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // 2. Sticky Glass Header Scroll Effect
  const header = document.getElementById('navbar-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-lg', 'bg-opacity-90');
      } else {
        header.classList.remove('shadow-lg', 'bg-opacity-90');
      }
    });
  }

  // 3. Mobile Hamburger Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // 4. Hero Section Typing Effect
  const typeTarget = document.getElementById('typing-text');
  if (typeTarget) {
    const words = JSON.parse(typeTarget.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typeTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typeTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing next word
      }

      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);
  }

  // 5. Before/After Color Grading Comparison Slider
  const comparisonSlider = document.getElementById('color-slider');
  const gradedImage = document.getElementById('graded-img');
  const sliderHandle = document.getElementById('slider-handle');

  if (comparisonSlider && gradedImage && sliderHandle) {
    comparisonSlider.addEventListener('input', (e) => {
      const sliderVal = e.target.value;
      gradedImage.style.clipPath = `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`;
      sliderHandle.style.left = `${sliderVal}%`;
    });
  }

  // 6. Portfolio Filter Logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button states
        filterButtons.forEach(btn => {
          btn.classList.remove('bg-cyan-500', 'text-black');
          btn.classList.add('bg-zinc-800', 'text-zinc-400');
        });
        button.classList.remove('bg-zinc-800', 'text-zinc-400');
        button.classList.add('bg-cyan-500', 'text-black');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.classList.remove('hidden');
            // Trigger animation fade-in
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transition = 'opacity 0.4s ease-in-out';
            }, 50);
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // 7. Video Detail Modal
  const modal = document.getElementById('video-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTools = document.getElementById('modal-tools');
  const modalFrameContainer = document.getElementById('modal-frame-container');
  const modalClose = document.getElementById('modal-close');
  const openModalElements = document.querySelectorAll('.open-modal');

  if (modal && modalClose) {
    openModalElements.forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        const title = element.getAttribute('data-title');
        const desc = element.getAttribute('data-desc');
        const tools = element.getAttribute('data-tools');
        const videoSrc = element.getAttribute('data-video');

        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        // Build tools tags
        modalTools.innerHTML = '';
        if (tools) {
          tools.split(',').forEach(tool => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-semibold';
            span.textContent = tool.trim();
            modalTools.appendChild(span);
          });
        }

        // Embed video/mock player
        modalFrameContainer.innerHTML = '';
        if (videoSrc) {
          if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
            // YouTube Embed code
            const embedUrl = videoSrc.replace('watch?v=', 'embed/');
            modalFrameContainer.innerHTML = `
              <iframe class="w-full aspect-video rounded-lg" src="${embedUrl}?autoplay=1" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>`;
          } else {
            // Self-hosted HTML5 video or a highly premium video player mockup
            modalFrameContainer.innerHTML = `
              <div class="relative w-full aspect-video bg-zinc-950 rounded-lg flex flex-col justify-center items-center text-center p-6 border border-zinc-800">
                <i class="fas fa-play-circle text-6xl text-cyan-500 mb-4 animate-pulse"></i>
                <h4 class="text-xl font-bold text-white mb-2">Cinematic Preview Player</h4>
                <p class="text-zinc-400 text-sm max-w-md mb-4">Simulating high fidelity video play. (In production, replace with YouTube/Vimeo embed or actual video file: <code class="text-cyan-400 font-mono text-xs">${videoSrc}</code>)</p>
                <div class="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden max-w-sm">
                  <div class="bg-cyan-500 h-full w-2/3 animate-[pulse_1.5s_infinite]"></div>
                </div>
              </div>`;
          }
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Lock scrolling
      });
    });

    const closeModalFunc = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      modalFrameContainer.innerHTML = ''; // Stop video playback
      document.body.style.overflow = 'auto'; // Restore scroll
    };

    modalClose.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalFunc();
      }
    });
  }

  // 8. Contact Form Client-side Simulator
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate success response
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.disabled = true;
      btn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Sending...`;

      setTimeout(() => {
        // Success alert
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-black px-6 py-3 rounded-xl shadow-lg flex items-center space-x-3 z-50 animate-bounce font-bold';
        toast.innerHTML = `<i class="fas fa-check-circle text-xl"></i> <span>Message Sent Successfully! මම ඉක්මනින්ම ඔයාට WhatsApp එකෙන් හෝ Email එකෙන් කතා කරන්නම්.</span>`;
        document.body.appendChild(toast);
        
        btn.innerHTML = `<i class="fas fa-check mr-2"></i> Sent!`;
        contactForm.reset();

        setTimeout(() => {
          toast.remove();
          btn.disabled = false;
          btn.innerHTML = originalText;
        }, 4000);
      }, 1500);
    });
  }
});
