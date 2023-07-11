import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import getIssues from 'api/getIssues';

export default function useInfinityQuery<T extends Partial<IOptions>>(url: string, options: T) {
  const [page, setPage] = useState<number>(options.page ?? 1);
  const [data, setData] = useState<AxiosResponse | null>(null);

  const newObtions = { ...options, page };

  useEffect(() => {
    (async function () {
      const data = await getIssues<T>(url, newObtions);
      setData(data);
    })();
  }, [setData, getIssues]);

  return { data, setPage };
}
