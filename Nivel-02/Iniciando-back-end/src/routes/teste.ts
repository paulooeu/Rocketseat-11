import api from 'axios';
import CredenciadoNovoSin from '../Repository/CredenciadoNovoSin';
import CredenciadoSin from '../Repository/CredenciadoSin';
import CredenciadoGis from '../Repository/CredenciadoGis';

class BuscarLocalService {
  async execute(req, res) {
    try {
      const { rbase, sistema } = req.body;
      let enderecoPessoaList;

      switch (sistema) {
        case 'NS':
          enderecoPessoaList = await new CredenciadoNovoSin().findAllByFilter(
            rbase,
          );
          break;
        case 'S':
          enderecoPessoaList = await new CredenciadoSin().findAllByFilter(
            rbase,
          );
          break;
        case 'G':
          enderecoPessoaList = await new CredenciadoGis().findAllByFilter(
            rbase,
          );
          break;

        default:
          break;
      }

      const caracterComAcento =
        'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ`´';
      const caracterSemAcento =
        'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC  ';

      enderecoPessoaList.map(async (endereco) => {
        let logradouro = '';
        let palavraSemAcento = '';
        logradouro += `${endereco.tipo_logradouro} `;
        logradouro += `${endereco.logradouro} `;
        logradouro += `${endereco.complemento} `;
        logradouro += `${endereco.numero} `;
        logradouro += `${endereco.bairro} `;
        logradouro += `${endereco.cidade} `;
        logradouro += `${endereco.estado} ,`;
        logradouro += `${endereco.nome} `;

        for (let i = 0; i < logradouro.length; i++) {
          const char = logradouro.substr(i, 1);
          const indexAcento = caracterComAcento.indexOf(char);
          if (indexAcento != -1) {
            palavraSemAcento += caracterSemAcento.substr(indexAcento, 1);
          } else {
            palavraSemAcento += char;
          }
        }
        logradouro = palavraSemAcento;

        await api
          .post(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${logradouro}&key=AIzaSyARzmym-3SfKGGU0fPGFQ7SwIimkVDQF6U`,
          )
          .then(function (response) {
            if (response.data.results[0]) {
              const { lat, lng } = response.data.results[0].geometry.location;

              switch (sistema) {
                case 'NS':
                  new CredenciadoNovoSin().update(endereco.id, lat, lng);
                  break;
                case 'S':
                  new CredenciadoSin().update(endereco.id, lat, lng);
                  break;
                case 'G':
                  new CredenciadoGis().update(endereco.id, lat, lng);
                  break;

                default:
                  break;
              }
              return res.json(enderecoPessoaList);
            }
          })
          .catch(console.log(`endereco errado - ${logradouro}`))
          .finally();
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new BuscarLocalService();
