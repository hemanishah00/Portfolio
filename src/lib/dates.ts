const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });

function formatMonth(ym: string): string {
  const [year, month] = ym.split('-').map(Number);
  return `${monthFormat.format(new Date(Date.UTC(year, month - 1, 1)))} ${year}`;
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end === null ? 'Present' : formatMonth(end)}`;
}
