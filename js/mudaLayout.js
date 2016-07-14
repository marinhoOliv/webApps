// Botao para trocar o modo de exibicao dos cards

(function () {
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
}) ();