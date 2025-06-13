// auth.js - 認証状態をチェックするスクリプト
(function() {
    // ログインページでは認証チェックをスキップ
    if (window.location.pathname.includes('login.html')) {
        return;
    }
    
    // 認証状態のチェック
    if (sessionStorage.getItem('authenticated') !== 'true') {
        // 認証されていない場合はログインページにリダイレクト
        window.location.href = 'login.html';
    }
})();
