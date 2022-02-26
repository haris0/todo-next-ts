export const generateCurrentDate = () => {
  const date = new Date().toISOString();
  const dateLong = date.split('T')[0];
  const time = date.split('T')[1].split('.')[0];
  return `${dateLong} ${time}`;
};

export const longDateFormat = (date: string) => {
  const dateFormat = new Date(date);
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const localTime = dateFormat.toLocaleDateString().split('/');
  const dayName = days[dateFormat.getDay()];
  const monthName = months[+localTime[0] - 1];

  return `${dayName}, ${localTime[1].padStart(2, '0')} ${monthName} ${localTime[2]}`;
};
