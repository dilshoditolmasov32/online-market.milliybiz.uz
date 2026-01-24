import api from "../api/axios";

const OtpService = {
  async sendOtp(phone) {
    const formattedPhone = phone.replace(/[^\d]/g, ""); 
    const response = await api.post("customer/otp/request", {
      username: formattedPhone,
    });
    return response.data;
  },

  async verifyOtp(phone, code, fullName) { 
    const formattedPhone = phone.replace(/[^\d]/g, "");
    
    const response = await api.post("customer/otp/verify", {
      phone: formattedPhone,
      otp: code,
      full_name: fullName 
    });
    return response.data;
  }
};

export default OtpService;