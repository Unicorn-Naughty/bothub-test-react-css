export const getMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${isNaN(hours) ? "00" : formattedHours}:${isNaN(minutes) ? "00" : formattedMinutes}`;
}