import api from "../api.config";
import apiEndpoints from "../api.endpoint";
import { UpdatePasswordDto } from "./utils/verificationTypes";

const validationService = {
  verify_admin: async (password: string) => {
    try {
      return api.post(apiEndpoints.verifyAdmin, { password });
    } catch (error) {
      throw error;
    }
  },

  updatePassword: async (data: UpdatePasswordDto) => {
    try {
      return api.put(apiEndpoints.updatePassword, data);
    } catch (error) {
      throw error;
    }
  },

  resetToken: async (reset_token: string) => {
    return api.post(`/reset-token`, { reset_token });
  },
  getStats: async () => {
    try {
      return await api.get(apiEndpoints.getStats);
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    try {
      return await api.get(apiEndpoints.getProfile);
    } catch (error) {
      throw error;
    }
  },
};

export default validationService;
