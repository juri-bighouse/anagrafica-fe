import api from "./axiosConfig";

export const addResidenza = async (personaId, residenza) => {
  const res = await api.post(`/persone/${personaId}/residenza`, residenza);
  return res.data;
};

export const updateResidenza = async (personaId, residenza) => {
  const res = await api.put(`/persone/${personaId}/residenza`, residenza);
  return res.data;
};

export const getPersonaConResidenza = async (personaId) => {
  const res = await api.get(`/persone/${personaId}`);
  return res.data;
};
