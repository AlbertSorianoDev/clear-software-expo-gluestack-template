import axios from "@/config/axios-instance";

export const deleteFormsId = async (id: number) => {
  try {
    const response = await axios.delete(`/forms/${id}`);

    if (response.status != 200) {
      throw Error("Error deleting form");
    }

    return null;
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
