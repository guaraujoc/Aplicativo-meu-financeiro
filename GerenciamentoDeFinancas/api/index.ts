const BASE_URL = "http://localhost:3000";

export const SIGN_IN = `${BASE_URL}/auth`;

export const USERS = `${BASE_URL}/users`;

export const OBJECTIVES = `${BASE_URL}/objectives`;

export const MEMBERS = `${BASE_URL}/families/members`;

export const TRANSACTION = `${BASE_URL}/transaction`;

// api.js (ou onde você centraliza suas chamadas de API)
export const fetchAllTransactions = async (token) => {
    const res = await fetch(TRANSACTION, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar dados');
    }

    return res.json();
};

