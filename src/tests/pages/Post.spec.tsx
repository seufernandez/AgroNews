/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import Post, { getServerSideProps } from '../../pages/news/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('next-auth/client');

const post = {
  slug: 'fake-uid',
  title: 'Fake Title',
  content: '<p>Fake Content</p>',
  updatedAt: 'January 01, 2022',
};

jest.mock('../../services/prismic');

describe('Home page', () => {
  it('should render', () => {
    render(<Post post={post} />);

    expect(screen.getByText('Fake Title')).toBeInTheDocument();
    expect(screen.getByText('Fake Content')).toBeInTheDocument();
  });

  it('redirect user if no active subscription', async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: 'fake-uid',
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      })
    );
  });

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: 'fake-uid',
      },
    } as any);

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
