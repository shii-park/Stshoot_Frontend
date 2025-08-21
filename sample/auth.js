// ▼▼▼ YOUR FIREBASE CONFIG HERE ▼▼▼
const firebaseConfig = {
  apiKey: "AAA",
  authDomain: "AAA",
  projectId: "AAA",
  storageBucket: "AAA",
  messagingSenderId: "AAA",
  appId: "AAA",
  measurementId: "AAA"
};
// ▲▲▲ YOUR FIREBASE CONFIG HERE ▲▲▲

// Firebaseの初期化
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM要素の取得
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const userInfo = document.getElementById('user-info');
const welcomeMessage = document.getElementById('welcome-message'); // h2要素を取得

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const guestNameInput = document.getElementById('guest-name');

const signupBtn = document.getElementById('signup');
const loginBtn = document.getElementById('login');
const googleLoginBtn = document.getElementById('google-login');
const anonymousLoginBtn = document.getElementById('anonymous-login');
const logoutBtn = document.getElementById('logout');

// --- 認証状態の監視 ---
auth.onAuthStateChanged(user => {
    if (user) {
        // ログインしている場合
        loginForm.style.display = 'none';
        dashboard.style.display = 'block';
        
        // === ▼▼▼ ここからが変更箇所 ▼▼▼ ===
        
        // displayNameがあれば「ようこそ、〇〇さん！」、なければ「ようこそ！」と表示
        welcomeMessage.textContent = user.displayName 
            ? `ようこそ、${user.displayName}さん！` 
            : 'ようこそ！';

        // === ▲▲▲ ここまでが変更箇所 ▲▲▲ ===

        const userInfoHTML = `
            <strong>UID:</strong> ${user.uid}<br>
            <strong>DisplayName:</strong> ${user.displayName || 'N/A'}<br> 
            <strong>Email:</strong> ${user.email || 'N/A'}<br>
            <strong>Provider:</strong> ${user.providerData[0].providerId}<br>
            <strong>Guest:</strong> ${user.isAnonymous ? 'Yes' : 'No'}
        `;
        userInfo.innerHTML = userInfoHTML;

    } else {
        // ログインしていない場合
        loginForm.style.display = 'block';
        dashboard.style.display = 'none';
        userInfo.innerHTML = '';
    }
});

// --- イベントリスナー ---
// ( ... 省略 ... 変更なし)

// 新規登録
signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('Signed up:', userCredential.user);
            alert('登録が完了しました！');
        })
        .catch(error => {
            console.error('Signup error:', error);
            alert('登録に失敗しました: ' + error.message);
        });
});

// メール/パスワードでログイン
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log('Logged in:', userCredential.user);
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('ログインに失敗しました: ' + error.message);
        });
});

// Googleでログイン
googleLoginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('Google login success:', result.user);
        })
        .catch(error => {
            console.error('Google login error:', error);
            alert('Googleログインに失敗しました: ' + error.message);
        });
});

// 匿名でログイン
anonymousLoginBtn.addEventListener('click', () => {
    const guestName = guestNameInput.value;
    if (!guestName) {
        alert('ゲスト用のユーザー名を入力してください。');
        return;
    }
    auth.signInAnonymously()
        .then((userCredential) => {
            const user = userCredential.user;
            return user.updateProfile({
                displayName: guestName
            });
        })
        .then(() => {
            console.log('Display name updated successfully');
        })
        .catch((error) => {
            console.error('Anonymous login or profile update error:', error);
            alert('ゲストログインに失敗しました: ' + error.message);
        });
});

// ログアウト
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log('Logged out');
    }).catch(error => {
        console.error('Logout error:', error);
    });
});