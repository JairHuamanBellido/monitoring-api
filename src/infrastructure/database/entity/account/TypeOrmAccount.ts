import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmUser } from '../user/TypeOrmUser';

@Entity({ name: 'account' })
export class TypeormAccount {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToOne(() => TypeOrmUser)
  @JoinColumn({ name: 'user_id' })
  user?: TypeOrmUser;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'bool', default: false, name: 'is_blocked' })
  isBlocked?: boolean;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive?: boolean;

  @Column({ type: 'varchar', name: 'created_by' })
  createdBy: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ nullable: true, type: 'varchar', name: 'updated_by' })
  updatedBy?: string;

  @Column({ nullable: true, type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @Column({ nullable: true, type: 'varchar', name: 'deleted_by' })
  deletedBy?: string;

  @Column({ nullable: true, type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;
}
