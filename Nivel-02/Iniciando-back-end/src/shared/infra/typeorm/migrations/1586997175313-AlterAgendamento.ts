import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterAgendamento1586997175313
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('agendamento', 'barbeiro');
    await queryRunner.addColumn(
      'agendamento',
      new TableColumn({
        name: 'barbeiro_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'agendamento',
      new TableForeignKey({
        name: 'AgendamentoBarbeiro',
        columnNames: ['barbeiro_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuario',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agendamento', 'AgendamentoBarbeiro');
    await queryRunner.dropColumn('agendamento', 'barbeiro_id');
    await queryRunner.addColumn(
      'agendamento',
      new TableColumn({ name: 'barbeiro', type: 'varchar' }),
    );
  }
}
