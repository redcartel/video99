// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import adminApiWrapper from '@/hooks_etc/adminApiWrapper'

type ApiRootData = {
  message: string,
  success: boolean
}

export default adminApiWrapper(function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiRootData>
) {
  res.status(200).json({ message: 'Hello Authorized API User', success: true })
});