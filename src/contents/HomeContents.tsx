/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ad from 'assets/image.png';
import { RootState } from 'modules';
import { Issue } from 'modules/homeStore';

const HomeContents = ({ setPage }: Partial<IContents>) => {
  const divRef = useRef<IRef>({});
  const navigate = useNavigate();
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
          <div key={`${issue.id} / ${index}`}>
            {index && index % 4 === 0 ? (
              <div css={adStyle} onClick={() => (window.location.href = 'https://www.wanted.co.kr/')}>
                <img src={ad} alt="ad" />
              </div>
            ) : null}
            <div
              css={homeContentsContainerStyle}
              ref={(ref) => {
                if (ref) divRef.current[index] = ref;
              }}
              onClick={() => navigate(`/issue/${issue.id}`, { state: { ...issue } })}
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

const adStyle = css`
  display: flex;
  width: 100%;
  height: 15vh;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 100px;
    height: 50px;
  }
`;

export default HomeContents;
