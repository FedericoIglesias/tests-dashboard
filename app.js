

function available(date) {
    const aux = new Date(date).getTime()
    const booking = {
        startDate: '4/17/2023',
        endDate: '4/20/2023'
    }

    const auxStart = new Date(booking.startDate).getTime()
    const auxEnd = new Date(booking.endDate).getTime()

    console.log(auxStart);
    console.log(aux);
    console.log(auxEnd);

    if (auxStart <= aux && auxEnd >= aux) {
        return true
    } else { return false }
}



console.log(available('4/24/2023'))