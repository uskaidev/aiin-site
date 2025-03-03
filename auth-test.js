// auth-test.js - 認証状態をチェックするスクリプト（テスト用）
(function() {
    // テスト用に認証済みとしてマーク
    sessionStorage.setItem('authenticated', 'true');
    console.log('Authentication bypassed for testing');
})();
