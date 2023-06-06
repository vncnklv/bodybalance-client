const baseUrl = 'http://localhost:3000';

const request = async (path, method, body) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
        headers['X-Authorization'] = token;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(`${baseUrl}${path}`, options);
    const data = await res.json();

    if (data.status === 'failed') {
        throw new Error(data.message);
    }

    return data.data;
}

export const get = (path) => request(path, 'GET');
export const post = (path, body) => request(path, 'POST', body);
export const patch = (path, body) => request(path, 'PATCH', body);
export const del = (path) => request(path, 'DELETE');
