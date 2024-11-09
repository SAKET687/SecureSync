import axios from "axios";

const api = axios.create({
	baseURL: "https://securesync-backend.onrender.com",
});
export default api;

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			console.error("API Error:", error.response.data);
			return Promise.reject(error.response.data);
		} else if (error.request) {
			console.error("Network Error:", error.message);
			return Promise.reject({
				message:
					"Network error. Please check your internet connection.",
			});
		} else {
			console.error("Error:", error.message);
			return Promise.reject({
				message: "Something went wrong. Please try again later.",
			});
		}
	}
);

export const setAuthToken = (token) => {
	if (token) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete api.defaults.headers.common["Authorization"];
	}
};
