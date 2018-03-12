export const getTweetDate = (tweetDate) => {
    const options = {
        day: 'numeric',
        month: 'long',
    };

    return new Date(tweetDate)
        .toLocaleString('en-US', options)
        .split(' ')
        .reverse()
        .join(' ');
};

export const getCurrentDate = () => {
    const date = new Date();

    return `${date.getFullYear()} ${date.getMonth() + 1} ${date.getDate()}`;
};

export const getNickName = email => `@${email.split('@')[0]}`;

export const getTweetText = tweetText => (
    `${tweetText[0].toUpperCase()}${tweetText.slice(1)}`
);
