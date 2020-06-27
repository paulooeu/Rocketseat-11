import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AdicionarAvatarNoUsuario1587812954742
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'usuario',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('usuario', 'avatar');
  }
}
