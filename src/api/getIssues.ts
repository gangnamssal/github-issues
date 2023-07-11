import Axios from 'libs/axiosInstance';

/**
 * @param url endpoint
 * @param options params
 * @returns AxiosResponse
 */
export default async function getIssues<T extends Partial<IOptions>>(url: string, options?: T) {
  const issueResponse = await Axios.get(url, { params: options });
  return issueResponse;
}
