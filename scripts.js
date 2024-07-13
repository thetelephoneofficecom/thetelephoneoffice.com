document.addEventListener('DOMContentLoaded', function () {
    var controller = new ScrollMagic.Controller();

    // Adding scroll-triggered class toggle using ScrollMagic
    document.querySelectorAll('.section').forEach(function (section) {
        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.8,
            offset: 50 // Adjust this offset to match your desired trigger point
        })
        .setClassToggle(section, 'visible')
        .addTo(controller);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', debounce(function () {
            const scrolled = window.scrollY;
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }, 10)); // Adjust debounce delay as needed
    }
});

// Debounce function to limit the frequency of execution of a function
function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            func.apply(context, args);
        }, delay);
    };
}
