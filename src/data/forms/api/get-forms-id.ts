import { Form } from "../types/form";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/screens/upload-images/utils/camel-case-parser";

export const getFormsId = async (id: number) => {
  try {
    const response = await axios.get(`/forms/${id}`);

    if (response.status != 200) {
      throw Error("Error fetching form");
    }

    return camelCaseParser<Form>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
