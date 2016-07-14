//IIFE - Immediately invoked function expressions

(function (controlador, $) {
	'use strict';
	var usuario = "majroliv@gmail.com";

	//Carrega cartoes
	$.getJSON(
		"https://ceep.herokuapp.com/cartoes/carregar?callback=?",
		{usuario : usuario},
		function (res) {
			var cartoes = res.cartoes;
			console.log(cartoes.length + " carregados em " + res.usuario);
			cartoes.forEach(function (cartao) {
				controlador.adiciona(cartao.conteudo);
		});
	});

	//Salvar cartoes
	$("#sync").click(function () {
		$(document).trigger("eventoSalvador");
	})

	//Evento customizado
	$(document).on("eventoSalvador", function () {
		$(this).addClass("botaoSync--anima");
		$("#sync").removeClass("botaoSync--error");
		$("#sync").removeClass("botaoSync--success");

		var cartoes = [];

		$(".cartao").each(function () {
			var conteudo = $(this).find(".cartao-conteudo").text();

			var cartao = {};
			cartao.conteudo = conteudo;
			cartoes.push(cartao);
		});

		// ecolha seu nome
		var mural = {
			usuario: usuario,
			cartoes: cartoes
		};

		$.ajax({
			url: "https://ceep.herokuapp.com/cartoes/salvar",
			method: "post",
			data: mural,
			success: function (res) {
				$("#sync").addClass("botaoSync--success"); 
				console.log(res.quantidade);
				console.log(controlador.idDoUltimoCartao() - $(".cartao").length);
			},
			error: function () {
				$("#sync").addClass("botaoSync--error"); 
			},
			complete: function () {
				$("#sync").removeClass("botaoSync--anima");
			}
		});
	});
}) (controleDeCartoes, $);