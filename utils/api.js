export const getMyScholarships = async (token) => {
  const res = await fetch('/api/scholarships/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getAllScholarships = async (token, page = 1, limit = 10) => {
  const res = await fetch(`/api/scholarships?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateScholarshipStatus = async (token, id, status) => {
  const res = await fetch(`/api/scholarships/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
};
