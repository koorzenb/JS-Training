export function date() {
    const d = new Date();
    const dateTimeFormat = new Intl.DateTimeFormat('en',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
    // Googled answer to convert date, but not sure what line below does or how to google this behaviour
    const [{value: weekday},,{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(d); 
    return `${weekday} ${month} ${day}, ${year }`;     
}