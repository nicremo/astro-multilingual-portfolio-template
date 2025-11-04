export function initializeTheme() {
  // This function should ideally run once to set up the theme and listeners.
  // If ThemeToggle components are numerous, this might need adjustment
  // or be called from a single place.

  const applyTheme = () => {
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  applyTheme(); // Apply theme on script load

  // Setup for all buttons with the class.
  // This assumes this script is loaded once for the page.
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  themeToggleButtons.forEach(button => {
    if (!button.hasAttribute('data-theme-listener-attached')) {
      button.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // No need to call applyTheme() here as classList.toggle handles the visual change.
      });
      button.setAttribute('data-theme-listener-attached', 'true');
    }
  });

  // Listen for system theme changes (if no user preference is set)
  // This part is from the global theme.js, good to have it consolidated.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) { // Only if no explicit user choice
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}

// Initialize when the script is loaded if DOM is ready, or wait for DOMContentLoaded.
// This ensures it runs even if the script is deferred or loaded asynchronously.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}
