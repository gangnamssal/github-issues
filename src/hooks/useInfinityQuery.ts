import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { IAction } from 'pages/Home';
import getIssues from 'api/getIssues';

export default function useInfinityQuery<T extends Partial<IOptions>, K extends IAction>(
  url: string,
  action: K,
  options: T
) {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(options.page ?? 1);
  const [data, setData] = useState<AxiosResponse | null>(null);

  const newObtions = { ...options, page };

  useEffect(() => {
    (async function () {
      const data = await getIssues<T>(url, newObtions);
      setData(data);
      dispatch(action(data?.data));
    })();
  }, [setData, getIssues, page]);

  return { data, page, setPage };
}
