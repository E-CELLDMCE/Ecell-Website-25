const scriptURL = 'https://script.google.com/macros/s/AKfycbyszMjg8Z_xDFbaypxyO62YzKAjxvkCxKcuiy5HvFGWDPmyuMBV4I5TDoW3TQP9DkQ/exec'; // 🔴 Replace this

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
        alert('Please fill all required fields (Name, Email & Message).');
        return;
    }

    // Submit to Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(document.getElementById('contactForm'))
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText || 'Thanks! Your message has been recorded.');
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error('Error!', error);
        alert('Something went wrong while submitting the form. Try again later.');
    });
});

function toggleMenu() {
            const nav = document.getElementById('mobileNav');
            nav.classList.toggle('active');
        }