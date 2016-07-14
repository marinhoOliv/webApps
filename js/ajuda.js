//Requisicao assincrona

(function () {
	$("#ajuda").click(function () {
		$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
			function (res) {
				var instrucoes = res.instrucoes;
				instrucoes.forEach(function (instrucao) {
					controleDeCartoes.adiciona(instrucao.conteudo, instrucao.cor);
				}) 
			}
		);
	}); 
}) ();