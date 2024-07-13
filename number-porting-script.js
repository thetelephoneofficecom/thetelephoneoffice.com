document.addEventListener('DOMContentLoaded', function () {
    // ScrollMagic initialization
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

    // Number porting form logic
    const form = document.getElementById('porting-form');
    if (form) {
        const button = document.getElementById('check-eligibility-button');
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default button behavior

            const numberInput = document.getElementById('number').value.trim();

            // Check eligibility based on simplified rules
            let message;

            // Check if number starts with '07'
            if (numberInput.startsWith('07')) {
                message = "Cannot be ported to VoIP.";
            } else if (numberInput.startsWith('03') || numberInput.startsWith('02') || numberInput.startsWith('01')) {
                message = "Eligible for porting to VoIP. Cost: £30 inc VAT per number.";
            } else if (numberInput.startsWith('44')) {
                const nextDigits = numberInput.substring(2, 4);
                if (nextDigits === '07') {
                    message = "Cannot be ported to VoIP.";
                } else if (nextDigits === '03' || nextDigits === '02' || nextDigits === '01') {
                    message = "Eligible for porting to VoIP. Cost: £30 inc VAT per number.";
                } else {
                    message = "Number format not recognized.";
                }
            } else {
                message = "Number format not recognized.";
            }

            // Display result
            const resultsContainer = document.getElementById('porting-results');
            resultsContainer.innerHTML = `<p>${message}</p>`;
        });
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
