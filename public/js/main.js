
function logout() {
    // 清除本地存储的 token
    localStorage.removeItem('token');
    // 重定向到登录页面或首页
    window.location.href = '/login.html';
}

function handleLogin() {
    const loginInput = document.getElementById('loginInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: loginInput,
            Password: passwordInput
        })
    })  .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.message || '登录失败'); });
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/index.html';
        } else {
            throw new Error('登录失败，无法获取 token！');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('登录失败：' + error.message);
    });
}



