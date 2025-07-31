import { Form } from "../types/form";
import { FormFieldCreate } from "../types/form-field";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";

export const postFormsIdFields = async (id: number, body: FormFieldCreate) => {
  try {
    const response = await axios.post(`/forms/${id}/fields`, body);

    if (response.status != 200) {
      throw Error("Error posting form field.");
    }

    return camelCaseParser<Form>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
