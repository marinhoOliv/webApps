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

var contador = $(".cartao").length;
$(".novoCartao").submit(function (e) {
	e.preventDefault();

	var campo = $(".novoCartao-conteudo");
	var conteudo = campo.val();

	if (conteudo) {
		contador++;

		var remove = $("<button>").text("Remover").attr("data-ref", contador)
		.addClass("opcoesDoCartao-opcao").addClass("opcoesDoCartao-remove")
		.click(removeCartao);

		var opcoes = $("<div>").addClass("opcoesDoCartao").append(remove);

		var p = $("<p>").addClass("cartao-conteudo").text(conteudo);

		$("<div>").addClass("cartao").attr("id", "cartao_" + contador).append(opcoes)
		.append(p).prependTo(".mural");
	}
	campo.val("");
})