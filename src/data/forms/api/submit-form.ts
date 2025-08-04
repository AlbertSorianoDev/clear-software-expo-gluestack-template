import { FormSubmissionResponse } from "../types/form-submission-response";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";

export const submitForm = async (formSubmissionId: number) => {
  try {
    const response = await axios.post(`/form-submissions/${formSubmissionId}/submit`);

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
