export function date() {
    const dateTimeFormat = new Intl.DateTimeFormat('en',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); 
    const [{value: weekday},,{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(new Date); 
    return `${weekday} ${month} ${day}, ${year }`;     
}