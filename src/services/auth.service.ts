import { AxiosError } from "axios";
import { tesloApi } from "../api/testlo.api";

export interface LoginResponse {
  id:       string;
  email:    string;
  fullName: string;
  isActive: boolean;
  roles:    string[];
  token:    string;
}



export class AuthService {
  static login = async (email: string, password: string): Promise<LoginResponse> => {

    try {
      const { data } = await tesloApi.post('/auth/login', {email, password});
      console.log(data);

      return data;
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error('Unable to login');
    }
  }

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = (await tesloApi.get('/auth/check-status'));
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Unauthorized');
    }
  }
}