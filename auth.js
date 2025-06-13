// 認証チェック関数
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
        window.location.href = 'login.html';
    }
}

// グローバルに公開
window.checkAuth = checkAuth;