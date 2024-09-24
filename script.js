const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let markedDate = new Date(); // Highlight today's date by default

// Custom dates you want to highlight (e.g., events or holidays)
const customMarkedDates = [
    
    new Date(2024, 12, 25) // Highlight December 25, 2024
    
];


function generateCalendar(month, year, highlightDate = null) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarBody.innerHTML = ''; // Clear previous calendar

    // Display month and year
    monthYear.innerHTML = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    let date = 1;

    // Create calendar rows
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        // Create each day cell
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.classList.add('empty'); // Empty cells before the start of the month
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break; // No more days to fill
            } else {
                cell.textContent = date;

                // Highlight today's date
                if (
                    highlightDate &&
                    highlightDate.getDate() === date &&
                    highlightDate.getMonth() === month &&
                    highlightDate.getFullYear() === year
                ) {
                    cell.classList.add('highlight-today'); // Add highlight for today's date
                }

                // Highlight any custom marked dates
                customMarkedDates.forEach((marked) => {
                    if (
                        marked.getDate() === date &&
                        marked.getMonth() === month &&
                        marked.getFullYear() === year
                    ) {
                        cell.classList.add('highlight-custom'); // Add highlight for custom marked dates
                    }
                });

                row.appendChild(cell);
                date++;
            }
        }

        calendarBody.appendChild(row); // Add row to the calendar body
    }
}

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear(), markedDate);
}

// Initial calendar load
generateCalendar(currentDate.getMonth(), currentDate.getFullYear(), markedDate);

// Event listeners for changing months
prevMonthBtn.addEventListener('click', () => changeMonth(-1));
nextMonthBtn.addEventListener('click', () => changeMonth(1));
