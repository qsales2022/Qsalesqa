export function formatPrice(price: number): string {
  const priceStr = price.toString();
  return price % 1 === 0 ? priceStr.split('.')[0] : priceStr;
}

const options: Intl.DateTimeFormatOptions = {
  timeZone: 'Asia/Qatar',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

const formateDate = (date: string | Date, index: number): string => {
  const originalDate = new Date(date);

  const adjustedDate =
    index === 1 ? new Date(originalDate.getTime() + 5 * 60000) : originalDate;

  const formattedParts = new Intl.DateTimeFormat(
    'en-US',
    options,
  ).formatToParts(adjustedDate);

  const month =
    formattedParts.find(part => part?.type === 'month')?.value || '';
  const day = formattedParts.find(part => part?.type === 'day')?.value || '';
  const year = formattedParts.find(part => part?.type === 'year')?.value || '';
  const hour = formattedParts.find(part => part?.type === 'hour')?.value || '';
  const minute =
    formattedParts.find(part => part?.type === 'minute')?.value || '';
  const period =
    formattedParts
      .find(part => part?.type === 'dayPeriod')
      ?.value.toUpperCase() || '';

  const qatarTime = `${month} ,${day}-${year},${hour}:${minute} ${period}`;
  return qatarTime;
};

export default formateDate;
