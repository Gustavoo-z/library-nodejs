import fs from 'fs';
import path from 'path';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'Caminho do texto a ser analisado')
    .option('-d, --destino <string>', 'Caminho da pasta destino')
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error(chalk.red('Por favor inserir o caminho do texto e o caminho da pasta destino'));
            program.help();
            return;
        }
        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);
        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green('Texto processado com sucesso!'));
        } catch (erro) {
            console.log('Ocorreu um erro no processamento', erro);
        }
    })

program.parse();

function processaArquivo(texto, destino) {
    fs.readFile(texto, 'utf8', (erro, texto) => {
        try {
            if (erro) throw erro;
            const resultado = contaPalavras(texto);
            criaESalvaArquivo(resultado, destino);
        } catch (erro) {
            trataErros(console.log(erro))
        }
    });
}

// async function criaESalvaArquivo(listaPalavras, endereco) {
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
//     try {
//         await fs.promises.writeFile(arquivoNovo, textoPalavras);
//         console.log('Arquivo salvo com sucesso!');
//     } catch (erro) {
//         throw erro;
//     }
// }

function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);
        
    fs.promises.writeFile(arquivoNovo, textoPalavras)
    .then(() => {
        console.log('Arquivo salvo com sucesso!');
    })
    .catch((erro) => {
        throw erro;
    })
    .finally(() => console.log('Processo finalizado!'))
}