import { FormSubmission } from "../types/form-submission";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";

export const getFormSubmission = async (id: number) => {
  try {
    const response = await axios.get(`/form-submissions/${id}`);

    if (response.status != 200) {
      throw Error("Error fetching form");
    }

    return camelCaseParser<FormSubmission>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
