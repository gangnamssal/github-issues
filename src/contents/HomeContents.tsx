/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { RootState } from 'modules';
import { Issue } from 'modules/homeStore';

const HomeContents = ({ setPage }: Partial<IContents>) => {
  const divRef = useRef<IRef>({});
  const { issues } = useSelector((state: RootState) => state.homeStore);

  const intersection = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        if (setPage) {
          setPage((page: number) => page + 1);
        }
      }
    });
  });

  useEffect(() => {
    if (divRef.current && issues.length) {
      const lastIndex = issues.length - 1;
      intersection.observe(divRef?.current[lastIndex]);
    }
  }, [issues]);
  return (
    <>
      {issues.map((issue: Issue, index: number) => {
        const [year, month, date] = issue.created_at.split('T')[0].split('-');
        return (
          <div
            css={homeContentsContainerStyle}
            key={`${issue.id} / ${index}`}
            ref={(ref) => {
              if (ref) divRef.current[index] = ref;
            }}
          >
            <div>
              <p>
                {`#${issue.number}`} {issue.title}
              </p>
              <p>
                작성자: {issue.user.login}, 작성일: {year}년 {month}월 {date}일
              </p>
            </div>

            <div>
              <p>코멘트: {issue.comments}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

interface IContents {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface IRef {
  [index: string]: HTMLElement;
}

const homeContentsContainerStyle = css`
  display: flex;
  width: 100%;
  height: calc(100% - 90px);
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddddddff;
  cursor: pointer;
`;

export default HomeContents;
