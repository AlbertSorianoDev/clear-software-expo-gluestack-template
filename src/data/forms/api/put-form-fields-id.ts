import { FormField, FormFieldUpdate } from "../types/form-field";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";
import { snakeCaseParser } from "@/data/utils/snake-case-parser";

export const putFormFieldsId = async (id: number, body: FormFieldUpdate) => {
  try {
    const response = await axios.put(
      `/form-fields/${id}`,
      snakeCaseParser({ ...body } as Record<string, unknown>),
    );

    if (response.status !== 200) {
      throw Error("Error updating form field.");
    }

    return camelCaseParser<FormField>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
