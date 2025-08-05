import { FieldResponse } from "../types/field-response";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";
import { snakeCaseParser } from "@/data/utils/snake-case-parser";

export const postFormFieldResponse = async (
  formSubmissionId: number,
  body: FormSubmissionFieldResponseCreate,
) => {
  try {
    const response = await axios.post(
      `/form-submissions/${formSubmissionId}/field-responses`,
      snakeCaseParser({ ...body } as Record<string, unknown>),
    );

    if (response.status != 200) {
      throw Error("Error posting forms");
    }

    return camelCaseParser<FieldResponse>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
