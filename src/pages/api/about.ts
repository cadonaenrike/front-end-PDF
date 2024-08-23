import api from "./api";

export const EditAbout = async (data: {}, idUser: number) => {
  try {
    const response = await api.put(`/atualizar-conta/${idUser}`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
export const GetAbout = async (idUser: number) => {
  try {
    const response = await api.get(`/contas/${idUser}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
