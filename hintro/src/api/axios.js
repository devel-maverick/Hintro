import axios from "axios";

const apiInstance =axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL || "https://mock-backend-hintro.vercel.app"
})

export default apiInstance;
