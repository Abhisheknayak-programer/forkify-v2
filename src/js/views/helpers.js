export const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} ${data.status}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postJSON = async function (url, uploadData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} ${data.status}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
