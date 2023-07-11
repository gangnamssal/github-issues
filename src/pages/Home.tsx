import { cloneElement, Suspense } from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import Error from 'components/Error';
import ErrorBoundary from 'components/ErrorBoundary';
import useInfinityQuery from 'hooks/useInfinityQuery';
import { AxiosResponse } from 'axios';

const HomeFetcher = ({ children }: { children: React.PropsWithChildren<ReactJSXElement> }) => {
  const { data, setPage } = useInfinityQuery<IParams>('facebook/react/issues', { page: 1, per_page: 20 });

  return cloneElement(children, { data, setPage });
};

const HomeContents = ({ data, setPage }: Partial<IContents>) => {
  console.log(data);
  return <>div</>;
};

export default function Home() {
  return (
    <main>
      <ErrorBoundary fallback={Error}>
        <Suspense fallback={<div>Loading</div>}>
          <HomeFetcher>
            <HomeContents />
          </HomeFetcher>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

interface IParams {
  page: number;
  per_page: number;
}

interface IContents {
  data: AxiosResponse;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
