var botao = document.querySelector("#mudaLayout");
botao.addEventListener("click", function () {

	var mural = document.querySelector(".mural");
	mural.classList.toggle("mural--linhas");

	if (mural.classList.contains("mural--linhas")) {
		this.textContent = "Blocos";
	} else {
		this.textContent = "Linhas";
	}

});

var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
for (var i = 0; i < botoes.length; i = i + 1) {
	botoes[i].addEventListener("click", removeCartao)
};

function removeCartao() {
	var id = this.dataset.ref;
	var cartao = document.querySelector("#cartao_" + id);
	cartao.classList.add(".opacity"),
	setTimeout(function () {
		cartao.remove();  
	}, 400)
}

// Decide o tipo de cartao
function decideTipoDoCartao (conteudo) {
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
	if (qtdaChar < 40 && linhas < 3 && maior.length < 6) {
		tipo = "cartao--fonteGrande";
	} else if (qtdaChar < 50 && linhas < 6 && maior.length < 10){
		tipo = "cartao--fonteMedia";
	};
	return tipo;
}

var contador = $(".cartao").length;
$(".novoCartao").submit(function (e) {
	e.preventDefault();

	var campo = $(".novoCartao-conteudo");
	var conteudo = campo.val().trim().replace(/\n/g, "<br>").replace(/\*\*(.*)\*\*/, '<b>$1</b>')
	.replace(/\*(.*)\*/, '<em>$1</em>');

	if (conteudo) {
		contador++;

		var remove = $("<button>").text("Remover").attr("data-ref", contador)
		.addClass("opcoesDoCartao-opcao").addClass("opcoesDoCartao-remove")
		.click(removeCartao);

		var opcoes = $("<div>").addClass("opcoesDoCartao").append(remove);

		var p = $("<p>").addClass("cartao-conteudo").html(conteudo);

		var tipo = decideTipoDoCartao(conteudo);

		$("<div>").addClass("cartao").addClass(tipo).attr("id", "cartao_" + contador)
		.append(opcoes)
		.append(p).prependTo(".mural");
	}
	campo.val("");
})