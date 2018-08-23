import jwtDecode from "jwt-decode";
import Request from "../utils/request";

export class ProviderService {
  request: Request;
  constructor(private readonly authorization?: string) {
    this.request = new Request({ authorization });
  }

  async getProviderSummaryForTheTop100DRG(filters): Promise<any> {
    console.log({ filters });
    // @TODO Add filters as query params
    const response = await this.request.Get("providers");
    return response && response.data;
  }
}
