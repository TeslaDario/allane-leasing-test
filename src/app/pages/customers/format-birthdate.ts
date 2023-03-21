export function getFormatedDate(birthDate: string): string {
  const d = new Date(birthDate),
    year = d.getFullYear(),
    month = formatNumber(d.getMonth() + 1),
    day = formatNumber(d.getDate());

  return [year, month, day].join('-');
}

// any is used here because type of birthDate in model and in response is not the same
export function formatBirthDate(birthDate: any): string {
  return birthDate.map(formatNumber).reverse().join('/');
}

function formatNumber(number: number): string {
  return number < 10 ? '0' + number : number.toString();
}
