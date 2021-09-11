import Prismic from '@prismicio/client'

export function getPrismicClient(req?: unknown) {

  const prismic = Prismic.client(
    'https://agronews.prismic.io/api/v2',
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  )

  return prismic;
}
