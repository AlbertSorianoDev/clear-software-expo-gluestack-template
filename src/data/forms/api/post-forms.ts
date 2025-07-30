import { Form } from "../types/form";

import axios from "@/config/axios-instance";
import { camelCaseParser } from "@/data/utils/camel-case-parser";

export const postForms = async () => {
  try {
    const response = await axios.post("/forms");

    if (response.status != 200) {
      throw Error("Error posting forms");
    }

    return camelCaseParser<Form>(response.data);
  } catch (e) {
    if (e instanceof Error) {
      throw Error(`Axios error: ${e.message}`);
    }
    throw Error("Axios error: Unknown error");
  }
};
