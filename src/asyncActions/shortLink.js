import { addLinkAsyncAction } from '../store/shortLinkReducer';
const bitlyToken = '434b0d83df197d4b8fb5e8e9f7c489893ced9bba';
const guId = 'Bm9fnnek820';

export const fetchShortLink = (link) => {
  return function (dispatch) {
    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bitlyToken}`,
      },
      body: JSON.stringify({
        long_url: link,
        group_guid: guId,
      }),
    })
      .then((response) => response.json())
      .then((json) => dispatch(addLinkAsyncAction(json.link)));
  };
};
