import { uuid } from 'uuidv4';

class Agendamento {
  id: string;

  barbeiro: string;

  data: Date;

  constructor({ barbeiro, data }: Omit<Agendamento, 'id'>) {
    this.id = uuid();
    this.barbeiro = barbeiro;
    this.data = data;
  }
}
export default Agendamento;
