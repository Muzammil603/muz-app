// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginPage({ setIsLoggedIn }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Retrieve user data from localStorage
//     const storedUsers = localStorage.getItem('users');
//     const users = storedUsers ? JSON.parse(storedUsers) : [];

//     // Find the user with the matching email and password
//     const user = users.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (user) {
//       // Store the user's role and id in localStorage
//       localStorage.setItem('userRole', user.role);
//       localStorage.setItem('userId', user.id);
//       setIsLoggedIn(true);

//       // Redirect the user based on their role
//       switch (user.role) {
//         case 'storeManager':
//           navigate('/admin');
//           break;
//         case 'salesman':
//           navigate('/salesman');
//           break;
//         case 'customer':
//           navigate('/products');
//           break;
//         default:
//           navigate('/');
//       }
//     } else {
//       // Display an error message for invalid credentials
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default LoginPage;