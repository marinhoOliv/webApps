// Botao para trocar o modo de exibicao dos cards
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

// Remover cartão
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
}

// adicona cartao
function adicionaCartao (conteudo, cor) {
	contador++;

	var remove = $("<button>").text("Remover").attr("data-ref", contador)
	.addClass("opcoesDoCartao-opcao").addClass("opcoesDoCartao-remove")
	.click(removeCartao);

	var opcoes = $("<div>").addClass("opcoesDoCartao").append(remove);

	var p = $("<p>").addClass("cartao-conteudo").html(conteudo);

	// chamada para nova função
	var tipo = decideTipoCartao(conteudo);

	$("<div>").addClass("cartao").addClass(tipo).attr("id", "cartao_" + contador)
	.append(opcoes).css("background-color", cor).append(p).prependTo(".mural");
}

// Verifica qtda de cartoẽs e grava novo cartao
var contador = $(".cartao").length;

// Novo cartao
$(".novoCartao").submit(function (e) {
	e.preventDefault();

	var campo = $(".novoCartao-conteudo");
	var conteudo = campo.val().trim().replace(/\n/g, "<br>").replace(/\*\*(.*)\*\*/, '<b>$1</b>')
	.replace(/\*(.*)\*/, '<em>$1</em>');

	if (conteudo) {
		adicionaCartao(conteudo);
	}
	campo.val("");
})

//Busca de texto dos cartões
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
})

//Requisicao assincrona
$("#ajuda").click(function () {
	$.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
		function (res) {
			var instrucoes = res.instrucoes;
			instrucoes.forEach(function (instrucao) {
				adicionaCartao(instrucao.conteudo, instrucao.cor);
			}) 
		}
	);
})


//Retorna dados salvos
var usuario = "majroliv@gmail.com";

//Salvar cartoes
$("#salvar").click(function () {
	$(this).addClass("botaoSync--anima");
	$("#salvar").removeClass("botaoSync--error");
	$("#salvar").removeClass("botaoSync--success");

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
	}

	$.ajax({
		url: "https://ceep.herokuapp.com/cartoes/salvar",
		method: "post",
		data: mural,
		success: function (res) {
			$("#salvar").addClass("botaoSync--success"); 
			console.log(res.quantidade);
		},
		error: function () {
			$("#salvar").addClass("botaoSync--error"); 
		},
		complete: function () {
			$("#salvar").removeClass("botaoSync--anima");
		}
	})
})


$.getJSON("https://ceep.herokuapp.com/cartoes/carregar?callback=?",
	{usuario : usuario},
	function (res) {
		var cartoes = res.cartoes;
		console.log(cartoes.length + " carregados em " + res.usuario);
		cartoes.forEach(function (cartao) {
			adicionaCartao(cartao.conteudo);
		});
	});