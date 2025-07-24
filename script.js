function fecharVisualizar() {
    document.getElementById("modalVisualizar").style.display = "none";
}

// ================== MOSTRAR CARDS ==================
async function mostrarCards() {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    try {
        const response = await fetch("controller/listarMural.php");
        const mural = await response.json();

        mural.forEach((item) => {
            const numeroLimpo = item.telefone.replace(/\D/g, '');
            const tipoClasseBtn = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';

            const card = `
            <div class="card m-2 p-3 d-flex flex-column justify-content-between" style="width: 18rem; height: 30rem">
                <span class="categoria ${item.categoria === 'V' ? 'vendo' : 'ofereco'}">
                    ${item.categoria === 'V' ? 'Vendo' : 'Ofereço'}
                </span>
                <h3 class="card-title mt-2 text-center">${item.titulo}</h3>
                <p class="descricao-limitada">${item.descricao}</p>
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Telefone:</strong> ${item.telefone}</p>
                <div class="mt-auto">
                    <div class="mt-2 d-flex gap-2">
                        <a href="tel:${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                            <img src="imagens/telefone.png" alt="Telefone" class="telWhats"> Ligar
                        </a>
                        <a href="https://wa.me/${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                            <img src="imagens/whatsapp.png" alt="Telefone" class="telWhats"> Whats
                        </a>
                    </div>
                    <div class="mt-2">
                        <div class="btn-ver-mais ${item.categoria === 'V' ? 'vendo' : 'ofereco'}" onclick="abrirVisualizar(${item.id})">
                            Ver mais
                        </div>
                    </div>
                </div>
            </div>
        `;
            cardsContainer.innerHTML += card;
        });

    } catch (error) {
        console.error("Erro ao carregar mural:", error);
    }
}

// ================== AO CARREGAR A PÁGINA ==================
window.onload = function () {
    mostrarCards();
    const telefoneInput = document.getElementById("telefone");
    aplicarMascaraTelefone(telefoneInput);
};

// ================== EXIBE ALERTA ==================
function exibirAlerta(mensagem, tipo = 'sucesso') {
    const alerta = document.getElementById("alerta");
    alerta.className = `alerta ${tipo}`;
    alerta.textContent = mensagem;
    alerta.style.display = 'block';
    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}

// ================== VISUALIZAR CARD ==================
async function abrirVisualizar(id) {
    try {
        const response = await fetch(`controller/visualizarMural.php?id=${id}`);
        const item = await response.json();

        document.getElementById("visualizarTitulo").textContent = item.titulo;
        document.getElementById("visualizarDescricao").textContent = item.descricao;
        document.getElementById("visualizarNome").textContent = item.nome;
        document.getElementById("visualizarEmail").textContent = item.email;
        document.getElementById("visualizarTelefone").textContent = item.telefone;

        // const numeroLimpo = item.telefone.replace(/\D/g, '');
        const numeroLimpo = (item.telefone ?? '').replace(/\D/g, '');
        const linkLigar = document.getElementById("linkLigar");
        const linkWhatsapp = document.getElementById("linkWhatsapp");

        linkLigar.href = `tel:${numeroLimpo}`;
        linkWhatsapp.href = `https://wa.me/${numeroLimpo}`;

        linkLigar.classList.remove('btn-vendo', 'btn-ofereco');
        linkWhatsapp.classList.remove('btn-vendo', 'btn-ofereco');

        const classeCategoria = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';
        linkLigar.classList.add(classeCategoria);
        linkWhatsapp.classList.add(classeCategoria);

        document.getElementById("modalVisualizar").style.display = "block";

    } catch (error) {
        console.error("Erro ao visualizar item:", error);
    }
}

function fecharVisualizar() {
    document.getElementById("modalVisualizar").style.display = "none";
}

const modal = document.getElementById("modalVisualizar");

modal.addEventListener("click", function(event) {
  // Se o clique for exatamente no modal (fundo), fecha
  if (event.target === modal) {
    fecharVisualizar();
  }
});

// ================== Mascara telefone ==================
function aplicarMascaraTelefone(input) {
    input.addEventListener("input", function () {
        let valor = input.value.replace(/\D/g, "");
        if (valor.length > 11) valor = valor.slice(0, 11);
        if (valor.length > 0) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
        }
        input.value = valor.trim();
    });
}


// ================== FILTRO ==================
function abrirFiltrar() {
    document.getElementById("modalFiltrar").style.display = "block";
}

window.onclick = function(event) {
    const modal = document.getElementById("modalFiltrar");
    if (event.target === modal) {
        fecharFiltrar();
    }
}


document.getElementById("formFiltrar").addEventListener("submit", async function (e) {
    e.preventDefault();

    const categoria = document.getElementById("filtroCategoria").value;
    const titulo = document.getElementById("filtroTitulo").value;

    try {
        const response = await fetch(`controller/filtroMural.php?filtroCategoria=${encodeURIComponent(categoria)}&filtroTitulo=${encodeURIComponent(titulo)}`);
        const resultados = await response.json();

        exibirCards(resultados); // Você deve ter essa função ou algo similar
        fecharFiltrar();

        document.getElementById("alertaFiltro").style.display = "block";
        setTimeout(() => {
            document.getElementById("alertaFiltro").style.display = "none";
        }, 3000);
    } catch (error) {
        console.error("Erro ao aplicar filtro:", error);
    }
});

function exibirCards(mural) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    mural.forEach((item) => {
        const numeroLimpo = item.telefone.replace(/\D/g, '');
        const tipoClasseBtn = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';

        const card = `
            <div class="card m-2 p-3 d-flex flex-column justify-content-between" style="width: 18rem; height: 100%;">
                <span class="categoria ${item.categoria === 'V' ? 'vendo' : 'ofereco'}">
                    ${item.categoria === 'V' ? 'Vendo' : 'Ofereço'}
                </span>
                <h3 class="card-title mt-2 text-center">${item.titulo}</h3>
                <p class="descricao-limitada">${item.descricao}</p>
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Telefone:</strong> ${item.telefone}</p>
                <div class="mt-auto">
                    <div class="mt-2 d-flex gap-2">
                        <a href="tel:${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                            <img src="imagens/telefone.png" alt="Telefone" class="telWhats"> Ligar
                        </a>
                        <a href="https://wa.me/${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                            <img src="imagens/whatsapp.png" alt="WhatsApp" class="telWhats"> Whats
                        </a>
                    </div>
                    <div class="mt-2">
                        <div class="btn-ver-mais ${item.categoria === 'V' ? 'vendo' : 'ofereco'}" onclick="abrirVisualizar(${item.ID})">
                            Ver mais
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += card;
    });

    if (mural.length === 0) {
        cardsContainer.innerHTML = "<p class='text-center mt-3'>Nenhum resultado encontrado com esse filtro.</p>";
    }
}

function fecharFiltrar() {
    document.getElementById("modalFiltrar").style.display = "none";
}






// ================== CADASTRO DE USUÁRIO ==================

// ================== ABRIR E FECHAR MODAL DE CADASTRO ==================
function abrirCadastro() {
    document.getElementById("modalCadastro").style.display = "block";
}

function fecharCadastro() {
    document.getElementById("modalCadastro").style.display = "none";
}

window.onclick = function(event) {
    const modalCadastro = document.getElementById("modalCadastro");
    if (event.target === modalCadastro) {
        fecharCadastro();
    }

    const modalFiltrar = document.getElementById("modalFiltrar");
    if (event.target === modalFiltrar) {
        fecharFiltrar();
    }
}

// ================== FORMULÁRIO DE CADASTRO DE USUÁRIO ==================

// ================== ABRIR E FECHAR MODAL DE CADASTRO ==================
function abrirCadastro() {
    document.getElementById("modalCadastro").style.display = "block";
}

function fecharCadastro() {
    document.getElementById("modalCadastro").style.display = "none";
}

window.onclick = function(event) {
    const modalCadastro = document.getElementById("modalCadastro");
    if (event.target === modalCadastro) {
        fecharCadastro();
    }

    const modalFiltrar = document.getElementById("modalFiltrar");
    if (event.target === modalFiltrar) {
        fecharFiltrar();
    }
};

// ================== FORMULÁRIO DE CADASTRO DE USUÁRIO ==================
document.getElementById("formCadastrar").addEventListener("submit", async function (e) {
    e.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmaSenha").value;
    const erroSenha = document.getElementById("erroSenha");

    if (senha !== confirmarSenha) {
        erroSenha.classList.remove("d-none");
        return;
    } else {
        erroSenha.classList.add("d-none");
    }

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("controller/cadastrarUsuario.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            form.reset();
            fecharCadastro();
            exibirAlerta("Usuário cadastrado com sucesso!", "sucesso");
        } else {
            exibirAlerta(result.message || "Erro ao cadastrar usuário.", "erro");
        }
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        exibirAlerta("Erro de conexão ao cadastrar.", "erro");
    }
});

// ================== FUNÇÃO DE ALERTA ==================
function exibirAlerta(mensagem, tipo = "sucesso") {
    const alerta = document.getElementById("alerta");
    alerta.textContent = mensagem;
    alerta.className = "alerta " + tipo;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000);
}