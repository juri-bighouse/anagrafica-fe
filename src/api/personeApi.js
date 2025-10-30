import api from "./axiosConfig";

export const getPersone = async () => {
  const res = await api.get("/persone");
  return res.data;
};

export const createPersona = async (persona) => {
  const res = await api.post("/persone", persona);
  return res.data;
};

export const deletePersona = async (id) => {
  await api.delete(`/persone/${id}`);
};

export const getPersoneByIndirizzo = async (indirizzo) => {
  const res = await api.get(`/persone/indirizzo/${indirizzo}`);
  return res.data;
};

export const getPersonaById = async (id) => {
  const res = await api.get(`/persone/${id}`);
  return res.data;
};
