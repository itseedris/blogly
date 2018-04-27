/**
 * ./app/js/helpers
 */

import moment from 'moment';

export const truncate = (word, length) =>
    word
        .split(' ')
        .splice(0, length)
        .join(' ');

export const format_date = server_date => {
    let date = new Date(server_date);

    if (
        new Date(date).getFullYear() == new Date().getFullYear() &&
        moment(date).week() !== moment(Date.now()).week()
    ) {
        return moment(date).format('MMM DD');
    } else if (moment(date).week() == moment(Date.now()).week()) {
        return moment(date).fromNow();
    }

    return moment(date).format('MMM DD [\']YY');
};

export const validate_password = password => {
    const regExp = new RegExp(
        '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    return regExp.test(password);
};

export const validate_html = html => {
    const regExp = /<[a-z][\s\S]*>/i;
    return regExp.test(html);
};

export const strip_filename = name => {
    return name.split('/').pop();
};

export const upload_file = file => {
    const url = 'http://192.168.43.200:5000/';
    const formData = new FormData();
    formData.append('file', file);

    const headers = {
        method: 'POST',
        body: formData
    };

    return fetch(url, headers).then(res => res.json());
};

export const gcd = (a, b) => {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
};

export const count_words_in_html = string => {
    string = string.replace(/<(?:.|\n)*?>/gm, '');
    string = string.replace(/(^\s*)|(\s*$)/gi, '');
    string = string.replace(/[ ]{2,}/gi, ' ');
    string = string.replace(/\n /, '\n');
    return string.split(' ').length;
};
