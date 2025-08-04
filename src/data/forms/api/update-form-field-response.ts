import {
  FormSubmissionFieldResponseUpdate,
  FormSubmissionResponse,
} from "../types/form-submission-response";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";
import { snakeCaseParser } from "@/data/utils/snake-case-parser";

export const updateFormFieldResponse = async (
  fieldResponseId: number,
  body: FormSubmissionFieldResponseUpdate,
) => {
  try {
    const response = await axios.put(
      `/field-responses/${fieldResponseId}`,
      snakeCaseParser({ ...body } as Record<string, unknown>),
    );

    if (response.status != 200) {
      throw Error("Error posting forms");
    }

    return camelCaseParser<FormSubmissionResponse>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
