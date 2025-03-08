export default function trataErros(erro) {
    if (erro.code === 'ENOENT') {
        return 'Arquivo não encontrado';
    } else {
        return 'Erro ao ler o arquivo';
    }
}