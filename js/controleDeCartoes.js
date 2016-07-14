var controleDeCartoes = (function () {
	'use strict';
	// Verifica qtda de cartoẽs e grava novo cartao
	var contador = $(".cartao").length;

	// adicona cartao
	function adicionaCartao (conteudo, cor) {
		contador++;

		var opcoes = criaOpcoesDoCartao(contador);
		
		// chamada para nova função
		var tipo = decideTipoCartao(conteudo);

		var p = $("<p>").addClass("cartao-conteudo").html(conteudo);


		$("<div>").addClass("cartao").addClass(tipo).attr("id", "cartao_" + contador)
		.append(opcoes).css("background-color", cor).append(p).prependTo(".mural");
	};

	// Decide o tipo de cartao
	function decideTipoCartao (conteudo) {
		var qtdaChar = conteudo.replace(/<br>/g, "").length;
		var linhas = conteudo.split("<br>").length;
		var palavras = conteudo.replace(/<br>/g, "").split("");
		var maior = "";

		palavras.forEach(function (palavra) {
			if (palavra.length > maior.length) {
				maior = palavra;
			}
		});

		var tipo = "cartao--fontePequena";
		if (qtdaChar < 20 && linhas < 3 && maior.length < 6) {
			tipo = "cartao--fonteGrande";
		} else if (qtdaChar < 50 && linhas < 6 && maior.length < 10){
			tipo = "cartao--fonteMedia";
		};
		return tipo;
	};

	return {
		adiciona: adicionaCartao,
		idDoUltimoCartao: function () {
			return contador;
		}
	}

}) ();