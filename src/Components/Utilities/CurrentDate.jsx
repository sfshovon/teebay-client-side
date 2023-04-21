const CurrentDate = () => {
  const today = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options)
    .replace(/\b\d{1,2}\b/g, (day) => {
      const lastDigit = day % 10;
      const suffix = lastDigit === 1 && day !== '11' ? 'st' : lastDigit === 2 && day !== '12' ? 'nd' : lastDigit === 3 && day !== '13' ? 'rd' : 'th';
      return day + suffix;
    })
    .replace(',', '');
  const [month, day, year] = formattedDate.split(' ');
  const finalDate = `${day} ${month} ${year}`;

  return finalDate;
};

export default CurrentDate;