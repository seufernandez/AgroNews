import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import Posts, { getStaticProps } from '../../pages/news';
import { getPrismicClient } from '../../services/prismic';

const posts = [
  {
    slug: 'fake-slug',
    title: 'fake-title',
    excerpt: 'fake-excerpt',
    updatedAt: 'fake-updatedAt',
  },
];

jest.mock('../../services/prismic');

describe('Home page', () => {
  it('should render', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('fake-title')).toBeInTheDocument();
  });

  it('loads GetStaticProps Data', async () => {
    const getPrismicClientMocked = await mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'fake-uid',
            data: {
              title: [
                {
                  type: 'heading',
                  text: 'fake-title',
                },
              ],
              content: [
                {
                  type: 'paragraph',
                  text: 'fake-content',
                },
              ],
            },
            last_publication_date: '01-01-22',
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'fake-uid',
              title: 'fake-title',
              excerpt: 'fake-content',
              updatedAt: 'January 01, 2022',
            },
          ],
        },
      })
    );
  });
});
