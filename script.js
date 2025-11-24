document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------
    // 1. FUNCIONALIDADE EXTRA: MODAL/LIGHTBOX PARA VÍDEOS
    // ----------------------------------------------
    const modal = document.getElementById('videoModal');
    const closeButton = document.querySelector('.close-button');
    const videoIframe = document.getElementById('videoIframe');
    const videoThumbs = document.querySelectorAll('.video-thumb');

    // Verifica se os elementos chave existem antes de tentar adicionar eventos
    if (modal && videoIframe) {

        videoThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // ESTA É A LINHA DE TESTE PARA DEBUG:
                console.log('CLIQUE REGISTRADO! Tentando abrir modal...');

                const videoId = thumb.getAttribute('data-video-id');
                // Adiciona 'rel=0' para remover sugestões no final e 'autoplay=1' para iniciar automaticamente
                const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

                // Define o link do vídeo e abre o modal
                videoIframe.src = videoSrc;
                modal.style.display = 'block';
            });
        });

        // Função para fechar o modal
        const fecharModal = () => {
            modal.style.display = 'none';
            // Para parar o vídeo quando fechar (limpa o src do iframe)
            videoIframe.src = '';
        };

        // Eventos para fechar o modal
        if (closeButton) {
            closeButton.addEventListener('click', fecharModal);
        }

        // Fechar ao clicar fora do modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                fecharModal();
            }
        });
    }
    // ----------------------------------------------
    // 3. FUNCIONALIDADE EXTRA: MODAL PARA TEXTO DO BLOG
    // ----------------------------------------------
    const textoModal = document.getElementById('textoModal');
    const abrirTextoModal = document.getElementById('abrirTextoModal');
    const fecharTextoModal = document.querySelector('.close-button-texto');

    if (abrirTextoModal && textoModal) {
        abrirTextoModal.addEventListener('click', (event) => {
            event.preventDefault(); // Impede que a página suba
            textoModal.style.display = 'block';
        });

        fecharTextoModal.addEventListener('click', () => {
            textoModal.style.display = 'none';
        });

        // Fechar ao clicar fora do modal
        window.addEventListener('click', (event) => {
            if (event.target === textoModal) {
                textoModal.style.display = 'none';
            }
        });
    }
    // ----------------------------------------------
    // 2. FUNCIONALIDADE EXTRA: VALIDAÇÃO DE FORMULÁRIO SIMPLES
    // ----------------------------------------------
    const form = document.getElementById('orcamento-form');

    if (form) {
        const emailInput = document.getElementById('email');
        const tipoSelect = document.getElementById('tipo');
        const emailError = document.getElementById('email-error');
        const tipoError = document.getElementById('tipo-error');

        form.addEventListener('submit', function (event) {
            let formIsValid = true;

            // Limpa mensagens de erro anteriores e estilos
            emailError.textContent = '';
            tipoError.textContent = '';
            emailInput.style.borderColor = '#ccc';
            tipoSelect.style.borderColor = '#ccc';

            // Validação do campo Email
            if (!emailInput.value.includes('@') || emailInput.value.length < 5) {
                emailError.textContent = 'Por favor, insira um email válido.';
                emailInput.style.borderColor = 'red';
                formIsValid = false;
            }

            // Validação do campo Tipo de Projeto
            if (tipoSelect.value === "") {
                tipoError.textContent = 'Selecione o tipo de projeto.';
                tipoSelect.style.borderColor = 'red';
                formIsValid = false;
            }

            if (!formIsValid) {
                event.preventDefault(); // Impede o envio se a validação falhar
                alert('Atenção: Corrija os campos em vermelho para enviar a solicitação.');
            } else {
                // Simula o envio
                event.preventDefault();
                alert('Solicitação de orçamento enviada com sucesso! Em breve entraremos em contato.');
                form.reset();
            }
        });
    }
});