import md5 from 'crypto-js/md5';

export const getTokenFromApi = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
};
export const fetchGravatarImage = (email) => {
  const encryptedEmail = md5(email).toString();
  const gravatarURL = `https://www.gravatar.com/avatar/${encryptedEmail}`;
  return gravatarURL;
};
export const getQuestionsFromApi = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return data;
};
