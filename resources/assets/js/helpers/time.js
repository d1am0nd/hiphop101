const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

const tsToHuman = (ts) => {
  const current = Date.now();
  const elapsed = current - ts;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour ) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed/msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed/msPerMonth) + ' months ago';
  }
  return Math.round(elapsed/msPerYear ) + ' years ago';
};

const dbTsToHuman = (ts) => tsToHuman(ts * 1000);

export {
  tsToHuman,
  dbTsToHuman,
};
