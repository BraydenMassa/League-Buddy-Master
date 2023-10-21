import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  username: z.string().min(3).max(17),
  password: z.string().min(8).max(17),
})

export default schema
