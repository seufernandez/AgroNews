/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { useSession, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';
import Post, { getStaticProps } from '../../pages/news/preview/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/client');
jest.mock('next/router');

const post = {
  slug: 'fake-uid',
  title: 'Fake Title',
  content: '<p>Fake Content</p>',
  updatedAt: 'January 01, 2022',
};

jest.mock('../../services/prismic');

describe('Home page', () => {
  it('should render', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Post post={post} />);

    expect(screen.getByText('Fake Title')).toBeInTheDocument();
    expect(screen.getByText('Fake Content')).toBeInTheDocument();
    expect(screen.getByText('Want to continue reading?')).toBeInTheDocument();
  });

  it('redirect user to full content if active subscription', async () => {
    const getSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    getSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false,
    ] as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/news/fake-uid');
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: 'heading',
              text: 'Fake Title',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'Fake Content',
            },
          ],
        },
        last_publication_date: '01-01-2022',
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: 'fake-uid',
      },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'fake-uid',
            title: 'Fake Title',
            content: '<p>Fake Content</p>',
            updatedAt: 'January 01, 2022',
          },
        },
      })
    );
  });
});
