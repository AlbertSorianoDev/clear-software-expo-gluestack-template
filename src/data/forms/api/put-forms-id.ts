import { Form, FormUpdate } from "../types/form";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";

export const putFormsId = async (id: number, body: FormUpdate) => {
  try {
    const response = await axios.put(`/forms/${id}`, body);

    if (response.status !== 200) {
      throw Error("Error updating form");
    }

    return camelCaseParser<Form>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
