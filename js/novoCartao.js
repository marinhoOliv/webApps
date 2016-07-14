// Novo cartao

(function (controlador, $) {
	$(".novoCartao").submit(function (e) {
		'use strict';
		e.preventDefault();

		var campo = $(".novoCartao-conteudo");
		var conteudo = campo.val().trim().replace(/\n/g, "<br>").replace(/\*\*(.*)\*\*/, '<b>$1</b>')
		.replace(/\*(.*)\*/, '<em>$1</em>');

		if (conteudo) {
			controlador.adiciona(conteudo);
			$(document).trigger("eventoSalvador");
		}
		campo.val("");
	}); 
}) (controleDeCartoes, $);