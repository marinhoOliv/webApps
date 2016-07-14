//Busca de texto dos cartões
(function () {
	$("#busca").on("input", function () {
		//Guarda o valor digitado, removendo espaços extras
		var busca = $(this).val().trim();

		if (busca) {
			$(".cartao").hide().filter(function () {
				var conteudo = $(this).find(".cartao-conteudo").text();
				var regex = new RegExp(busca, "i");

				return conteudo.match(regex);
			}).show();
		} else {
			$(".cartao").show();
		}
	});	
})();
