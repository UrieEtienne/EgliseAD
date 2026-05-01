const BASE_URL = "http://192.168.1.100:5000/api";

// 🔐 LOGIN
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

// 👥 MEMBRES DE MON EGLISE
export const getMyMembers = async (token) => {
  const res = await fetch(`${BASE_URL}/members/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// 📩 SMS / MESSAGES
export const getMessages = async (token) => {
  const res = await fetch(`${BASE_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};