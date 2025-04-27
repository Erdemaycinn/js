interface User {
    username: string;
    password: string;
    walletNumber: string;
  }
  
  // Make handleLogin global so HTML can access it
  async function fetchUsers(): Promise<User[]> {
    const response = await fetch('users.json');
    if (!response.ok) {
      throw new Error('Failed to load users');
    }
    return await response.json();
  }
  
  export async function handleLogin() {
    const usernameInput = (document.getElementById('usernameinput') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('passwordinput') as HTMLInputElement).value;
    const messageDiv = document.getElementById('message') as HTMLDivElement;
  
    try {
      const users = await fetchUsers();
      const matchedUser = users.find(user => user.username === usernameInput && user.password === passwordInput);
  
      if (matchedUser) {
        messageDiv.innerHTML = `
          <p style="color:green;">Login successful!</p>
          <p>Welcome, <strong>${matchedUser.username}</strong></p>
          <p>Wallet Number: <strong>${matchedUser.walletNumber}</strong></p>
        `;
        setTimeout(() => {
            window.location.href = 'main.html'; // Redirects to index.html
          }, 2000);
      } else {
        messageDiv.innerHTML = `<p style="color:red;">Invalid username or password.</p>`;
      }
    } catch (error) {
      console.error(error);
      messageDiv.innerHTML = `<p style="color:red;">Error connecting to server.</p>`;
    }
  }
  
  // Make sure handleLogin is attached to window object so onclick can find it
  (window as any).handleLogin = handleLogin;
  