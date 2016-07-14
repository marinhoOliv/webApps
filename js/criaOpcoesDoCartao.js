var criaOpcoesDoCartao = (function () {
	'use strict';

	function removeCartao() {
		var id = this.dataset.ref;
		var cartao = document.querySelector("#cartao_" + id);
		cartao.classList.add(".opacity"),
		setTimeout(function () {
			cartao.remove();  
			$(document).trigger("eventoSalvador");
		}, 400)
	};

	return function (idNovoCartao) {
		var remove = $("<button>").text("Remover").attr("data-ref", idNovoCartao)
		.addClass("opcoesDoCartao-opcao").addClass("opcoesDoCartao-remove").click(removeCartao);

		var editar = $("<button>").text("Editar").attr("data-ref", idNovoCartao)
		.addClass("opcoesDoCartao-opcao").addClass("opcoesDoCartao-edita");

		var opcoes = $("<div>").addClass("opcoesDoCartao").append(remove).append(editar);

		return opcoes;
	}

}) ();