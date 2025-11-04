// Global animations using GSAP and AOS
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is properly registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
  // ScrollTrigger is registered globally via gsap.registerPlugin(ScrollTrigger)
  // Initialize AOS with custom settings
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false,
    offset: 50,
    delay: 50,
    disableMutationObserver: false,
  });

  // Refresh AOS when window resizes
  window.addEventListener('resize', () => {
    AOS.refresh();
  });

  // Custom animations for specific elements using GSAP

  // Navbar animations - sticky effect
  const navbar = document.getElementById('navbar');

  if (navbar) {
    ScrollTrigger.create({
      start: 'top-=200',
      end: 99999,
      toggleClass: { className: 'shadow-md', targets: navbar }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get the navbar height for offset
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight - 20,
          behavior: 'smooth'
        });

        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });

  // Scroll-triggered animations for sections

  // Timeline section animation
  const timelineItems = document.querySelectorAll('#timeline .timeline-item');

  if (timelineItems.length > 0) {
    gsap.from(timelineItems, {
      scrollTrigger: {
        trigger: '#timeline',
        start: 'top 70%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  // Skills section animations - combines AOS for scroll and GSAP for hover effects
  const skillClusters = document.querySelectorAll('.skill-cluster');

  if (skillClusters.length > 0) {
    // We'll let AOS handle the scroll animations, and use GSAP for hover effects

    skillClusters.forEach(cluster => {
      const toolItems = cluster.querySelectorAll('.tool-item');
      const clusterHeader = cluster.querySelector('.cluster-header');
      const clusterDescription = cluster.querySelector('.cluster-description');
      const clusterIcon = cluster.querySelector('.icon-container svg');

      // Enhanced cluster hover effect with more dynamic animations
      const primaryColorRGB = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-rgb').trim() || '37, 99, 235';
      const initialBorderColor = getComputedStyle(cluster).borderColor;
      const initialBoxShadow = getComputedStyle(cluster).boxShadow;

      // Create a hover timeline for more coordinated animations
      let hoverTimeline;

      cluster.addEventListener('mouseenter', () => {
        // Kill any existing animations
        if (hoverTimeline) hoverTimeline.kill();

        // Create new timeline for hover effect
        hoverTimeline = gsap.timeline();

        // Add various animations to the timeline
        hoverTimeline
          .to(cluster, {
            borderColor: `rgba(${primaryColorRGB}, 1)`,
            boxShadow: `0 8px 16px -3px rgba(${primaryColorRGB}, 0.25), 0 5px 10px -4px rgba(${primaryColorRGB}, 0.15)`,
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
          }, 0)
          .to(clusterIcon, {
            scale: 1.15,
            rotate: 5,
            duration: 0.4,
            ease: 'back.out(1.7)'
          }, 0)
          .to(clusterHeader, {
            x: 3,
            duration: 0.3,
            ease: 'power1.out'
          }, 0)
          .to(clusterDescription, {
            opacity: 0.9,
            x: 2,
            duration: 0.3,
            ease: 'power1.out'
          }, 0)
          .to(toolItems, {
            y: -3,
            stagger: 0.03,
            duration: 0.4,
            ease: 'power1.out'
          }, 0.1);
      });

      cluster.addEventListener('mouseleave', () => {
        // Kill any existing animations
        if (hoverTimeline) hoverTimeline.kill();

        // Create new timeline for hover-out effect
        hoverTimeline = gsap.timeline();

        // Reset all animations
        hoverTimeline
          .to(cluster, {
            borderColor: initialBorderColor,
            boxShadow: initialBoxShadow,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          }, 0)
          .to(clusterIcon, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: 'power2.out'
          }, 0)
          .to(clusterHeader, {
            x: 0,
            duration: 0.3,
            ease: 'power1.out'
          }, 0)
          .to(clusterDescription, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: 'power1.out'
          }, 0)
          .to(toolItems, {
            y: 0,
            stagger: 0.02,
            duration: 0.3,
            ease: 'power1.out'
          }, 0);
      });

      // Enhanced tool item hover animations
      toolItems.forEach(item => {
        const icon = item.querySelector('.tool-icon svg');
        const label = item.querySelector('p');

        if (icon && label) {
          let itemHoverTimeline;

          item.addEventListener('mouseenter', () => {
            // Kill any existing animations
            if (itemHoverTimeline) itemHoverTimeline.kill();

            // Create new timeline for item hover
            itemHoverTimeline = gsap.timeline();

            // Add coordinated animations for the tool item
            itemHoverTimeline
              .to(icon, {
                scale: 1.3,
                rotate: 10,
                duration: 0.25,
                ease: 'back.out(1.7)'
              }, 0)
              .to(label, {
                scale: 1.05,
                y: -2,
                color: `rgba(${primaryColorRGB}, 1)`,
                duration: 0.2,
                ease: 'power1.out'
              }, 0);
          });

          item.addEventListener('mouseleave', () => {
            // Kill any existing animations
            if (itemHoverTimeline) itemHoverTimeline.kill();

            // Create new timeline for item hover-out
            itemHoverTimeline = gsap.timeline();

            // Reset all animations
            itemHoverTimeline
              .to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.25,
                ease: 'power1.out'
              }, 0)
              .to(label, {
                scale: 1,
                y: 0,
                color: '',
                duration: 0.2,
                ease: 'power1.out'
              }, 0);
          });
        }
      });
    });
  }

  // Project cards hover effect
  const projectCards = document.querySelectorAll('#projects .group');

  projectCards.forEach(card => {
    const image = card.querySelector('img');

    if (image) {
      card.addEventListener('mouseenter', () => {
        gsap.to(image, {
          scale: 1.05,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    }
  });
});
