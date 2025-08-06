import { Form } from "../types/form";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";
import { snakeCaseParser } from "@/data/utils/snake-case-parser";

export const updateFieldOrder = async (formId: number, fiedlId: number, toOrder: number) => {
  try {
    const response = await axios.patch(
      `forms/${formId}/fields/${fiedlId}/order`,
      snakeCaseParser({ toOrder: toOrder } as Record<string, unknown>),
    );

    if (response.status !== 200) {
      throw Error("Error updating form field.");
    }

    return camelCaseParser<Form>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
