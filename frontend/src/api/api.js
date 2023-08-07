import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class. **/

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies. */

  static async getAllCompanies(name) {
    let res = await this.request(`companies/`, { name });
    console.log('res', res)
    return res.companies;
  }


  /** Get all jobs. */

  static async getAllJobs(title) {
    let res = await this.request(`jobs/`, { title });
    return res.jobs;
  }


  /** Get User. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Register New User. */

  static async registerUser(data) {
    let res = await this.request(`auth/register`, data, 'post');

    return res.token;
  }

  /** Login a user. */

  static async loginUser(data) {
    let res = await this.request(`auth/token`, data, 'post');
    return res.token;
  }


  /** Patch updated user. */

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user
  }


  /** Post job a user has applied to. */

  static async jobApply(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, 'post');
  }

}



export default JoblyApi;
