import { UserRole } from '@core/enums/UserRoleEnum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeormAccount } from '../account/TypeOrmAccount';

@Entity({ name: 'user' })
export class TypeOrmUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  rol: UserRole;

  @Column({ type: 'varchar' })
  dni: string;

  @OneToOne(() => TypeormAccount, (typeormAccount) => typeormAccount.user)
  account?: TypeormAccount;

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
