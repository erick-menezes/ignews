import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import sm from '../../sm.json';

export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

const routes = [
    {
      type: 'post',
      path: '/',
    },
    {
      type: 'post',
      path: '/:uid',
    },
  ]

  export function getPrismicClient(config: prismicNext.CreateClientConfig = {}) {
    const client = prismic.createClient(sm.apiEndpoint, {
        req: config.req,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        routes,
        ...config,
    })
  
    prismicNext.enableAutoPreviews({
      client,
      previewData: config.previewData,
      req: config.req,
    })
  
    return client
  } 