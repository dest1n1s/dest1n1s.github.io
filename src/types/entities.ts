import { Field, Model } from '@/utils/reflect'
import { mark } from '@/utils'

@Model
export class Blog {
  @Field()
  id!: number

  @Field()
  title!: string

  @Field()
  markdown!: string

  @Field({ factory: (data, parent) => mark(parent.markdown) })
  html!: string

  @Field({ type: Date })
  timeCreated!: Date
}
