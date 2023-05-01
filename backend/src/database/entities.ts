import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @Column({ type: 'longtext' })
  markdown!: string

  @CreateDateColumn()
  timeCreated!: Date

  constructor(title: string, markdown: string) {
    this.title = title
    this.markdown = markdown
  }
}
