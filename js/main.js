$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        dots: true, // Enable dots
        dotsEach: 1,
        nav: false, // Disable navigation arrows
       // autoplay: true,
       // autoplayTimeout: 5000,
        responsive:{
            0:{
                items:1,
               
            },
            600:{
                items:3,
            },
            1000:{
                items:3,
            }
        }
    });
});

const flashcards = [
    {
        question: "… <b>(тип міжклітинного зʼєднання)</b> з'єднують кератиноцити з базальною мембраною, формуючи міцне епідермально-дермальне з'єднання.",
        answer: "<b>Напівдесмосоми</b> з'єднують кератиноцити з базальною мембраною, формуючи міцне епідермально-дермальне з'єднання."
    },
    {
        question: "<b>…Ag</b> - поверхневий антиген вірусу гепатиту В, вказує на наявність вірусу в організмі.",
        answer: "<b>HBsAg</b> - поверхневий антиген вірусу гепатиту В, вказує на наявність вірусу в організмі."
    },
    {
        question: "... використовується в II, III триместрах вагітності, оскільки пропілтіоурацил має ...токсичний вплив.",
        answer: "<b>Метимазол</b> використовується в II, III триместрах вагітності, оскільки пропілтіоурацил має <b>гепато</b>токсичний вплив."
    }
];

const container = document.querySelector('.flashcard-container');
let currentCardIndex = 0; // To track the current card

const showCard = (index) => {
    const card = flashcards[index];
    container.innerHTML = `
        <div class="flashcard">
            <div class="card-front">
                <p>${card.question}</p>
                <div class="card-btns d-flex align-items-end justify-content-center">
                <button class="reveal-btn">Показати відповідь</button>
                </div>
            </div>
            <div class="card-back d-none">
                <p>${card.answer}</p>
                <div class="card-btns d-flex align-items-end justify-content-center">
                <button class="answer-btn wrong">Погано</button>
                <button class="answer-btn warning">Добре</button>
                <button class="answer-btn correct">Відмінно</button>
                </div>
            </div>
        </div>
    `;

    const revealButton = container.querySelector('.reveal-btn');
    revealButton.addEventListener('click', () => {
        container.querySelector('.card-front').classList.add('d-none');
        container.querySelector('.card-back').classList.remove('d-none');
    });

    const answerButtons = container.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentCardIndex < flashcards.length - 1) {
                currentCardIndex++;
                showCard(currentCardIndex); // Show next card
            } else {
                currentCardIndex = 0;
                showCard(currentCardIndex); // Show next card

            }
        });
    });
};

showCard(currentCardIndex); // Initialize the first card

const targetPercentages = [55, 72, 87, 100]; // Percentages for circle-1 to circle-4

document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.progress-ring');
    const texts = [
        document.getElementById('text-circle-1'),
        document.getElementById('text-circle-2'),
        document.getElementById('text-circle-3'),
        document.getElementById('text-circle-4')
    ];
    const targetPercentages = [90, 80, 70, 50]; // Custom stop points for each circle
    const svgContainer = document.querySelector('.progress-container');

    // Set up the initial circle appearance
    circles.forEach((circle, index) => {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;
    });

    function animateCircle(circle, index, duration) {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const targetOffset = circumference * (1 - (targetPercentages[index] / 100));
        let currentOffset = parseFloat(circle.style.strokeDashoffset);
        let step = (currentOffset - targetOffset) / duration;

        function animateStep() {
            currentOffset -= step;
            if (currentOffset <= targetOffset) {
                circle.style.strokeDashoffset = targetOffset;
                texts[index].textContent = texts[index].textContent.split(' ')[0] + ' ' + targetPercentages[index] + '%';
            } else {
                circle.style.strokeDashoffset = currentOffset;
                texts[index].textContent = texts[index].textContent.split(' ')[0] + ' ' + Math.round(100 - (100 * currentOffset / circumference)) + '%';
                requestAnimationFrame(animateStep);
            }
        }
        requestAnimationFrame(animateStep);
    }

    // Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the animation for each circle when the container is visible
                circles.forEach((circle, index) => {
                    animateCircle(circle, index, 100); // 100 animation frames, roughly 1.6 seconds
                });
                observer.unobserve(entry.target); // Optionally unobserve after animation starts
            }
        });
    }, { threshold: 0.5 }); // Start when half of the element is visible

    observer.observe(svgContainer);
});
