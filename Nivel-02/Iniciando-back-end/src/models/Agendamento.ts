import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Usuario from './Usuario';

@Entity('agendamento')
class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barbeiro_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'barbeiro_id' })
  barbeiro: Usuario;

  @Column('timestamp with time zone')
  data: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Agendamento;
