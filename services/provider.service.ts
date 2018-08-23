import jwtDecode from "jwt-decode";
import Request from "../utils/request";
import { objectToQueryParams } from "../utils/query";

export class ProviderService {
  request: Request;
  constructor(private readonly authorization?: string) {
    this.request = new Request({ authorization });
  }

  async getProviderSummaryForTheTop100DRG(filters): Promise<any> {
    const queryParams = filters ? "/?" + objectToQueryParams(filters) : "";
    console.log({ queryParams });
    const response = await this.request.Get("providers" + queryParams);
    return response && response.data;
  }
}
