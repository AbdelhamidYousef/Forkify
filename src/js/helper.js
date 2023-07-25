import * as config from './config';

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(`Request took too long! Timeout after ${sec} seconds`)
        ),
      sec * 1000
    );
  });
};

export const fetchData = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(config.TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
