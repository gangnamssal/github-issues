import { cloneElement, Suspense } from 'react';

import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import Error from 'components/Error';
import HomeContents from 'contents/HomeContents';
import { addIssues, Issue } from 'modules/homeStore';
import ErrorBoundary from 'components/ErrorBoundary';
import useInfinityQuery from 'hooks/useInfinityQuery';

const HomeFetcher = ({ children }: { children: React.PropsWithChildren<ReactJSXElement> }) => {
  const { setPage } = useInfinityQuery<IParams, IAction>('facebook/react/issues', addIssues, {
    page: 1,
    per_page: 20,
  });

  return cloneElement(children, { setPage });
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

export interface IAction {
  <T extends Issue>(issue: T[]): ReturnType<typeof addIssues>;
}
