const input = document.querySelector('.terminal__input');
const output = document.querySelector('.terminal__output');
const pages = document.querySelectorAll('.page');

let currentPage = 'home';


input.setAttribute("placeholder", "Type your command here...");
input.addEventListener('focus', function() {
  if (this.value === this.placeholder) {
    this.value = '';
  }
});

input.addEventListener('blur', function() {
  if (this.value === '') {
    this.value = this.placeholder;
  }
});




input.addEventListener('keyup', function(e) {					
	if (e.keyCode === 13) {
		const command = input.value.trim().toLowerCase();

		switch(command) {
			case 'help':
				
				output.innerHTML = '';
				typeMessage('\nAvailable commands: help, about, download, github, sds, tux', output);
				break;
			case 'about':
				typeMessage('\nO projeto InfinityOS é um sistema operativo open-source baseado no kernel Linux criado com o objetivo de ser rápido, eficiente e fácil de usar.\n É um projeto único, com programas exclusivos como o Gestor de Pacotes TUX e TUX-DEV, além de um sistema de hierarquia de ficheiros (Simplified Directory Structure) único, criado para facilitar a vida do utilizador.', output, true);
				
				break;
			case 'download':
				typeMessage('\nAinda está em fase de desenvolvimento...', output, true);
				
				break;
			case 'github':
				typeMessage('\nPoderá acessar a mais informações sobre o projeto InfinityOS na minha página do Github.', output, true);
				
				break;
			case 'sds':
				typeMessage('\nSimplified Directory Structure é um novo sistema de hierarquia de ficheiros, exclusivo no InfinityOS. \nFoi projetado de maneira a facilitar a procura de ficheiros e a organização do ambiente, além de suportar *downgrades* de arquivos e a realização de backups de maneira segura.', output, true);
				
				break;
			case 'tux':
				typeMessage('\nO sistema operativo terá dois gestor de pacotes: \n\n--- TUX (para a instalação de programas e pacotes (recomendado))\n--- TUX-DEV (para a compilação e instalação de programas diretamente a partir do código-fonte (mais atualizado))', output, true);
				
				break;
			
				
			default:	
				const popup = document.createElement('div');
				popup.classList.add('error-popup');
				popup.innerHTML = `
					<div class="error-popup__header">
						<h2 class="error-popup__title">...</h2>
						<button class="error-popup__close-btn">&times;</button>
					</div>
					<div class="error-popup__content">
						<p class="error-popup__text">ERROR 404 - Not Found</p>
					</div>
				`;
				document.body.appendChild(popup);
				const popupTop = Math.floor(Math.random() * window.innerHeight);
				const popupLeft = Math.floor(Math.random() * window.innerWidth);
				popup.style.top = `${popupTop}px`;
				popup.style.left = `${popupLeft}px`;
				document.body.appendChild(popup);
				setTimeout(() => {
					popup.remove();
				}, 5000);

				const closeButton = popup.querySelector('.error-popup__close-btn');
				closeButton.addEventListener('click', () => {
					popup.remove();
				});
		
				input.disabled = false;
				input.focus();
				break;
		}

		input.value = '';
	}
});



// Função para escrever mensagem

function typeMessage(message, outputElement, rewriting = false) {
  const delay = 50;
  let i = 0;
  const cursorElement = document.createElement('span');
  cursorElement.innerText = '▮';
  outputElement.appendChild(cursorElement);

  // Disable the input element
  const inputElement = outputElement.previousElementSibling;
  inputElement.disabled = true;

  if (rewriting) {
    // Animate the text removal
    let currentText = outputElement.innerText;
    let removeIntervalId = setInterval(() => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        outputElement.innerText = currentText;
      } else {
        clearInterval(removeIntervalId);
        // Start typing the new message after the text removal animation is complete
        setTimeout(() => typeMessage(message, outputElement, false), 500);
      }
    }, delay);
  } else {
    const intervalId = setInterval(() => {
      if (i < message.length) {
        const currentText = outputElement.innerText;
        outputElement.innerText = currentText.slice(0, -1) + message.charAt(i) + cursorElement.innerText;
        i++;
      } else {
        clearInterval(intervalId);
        cursorElement.remove();
        inputElement.disabled = false;
        inputElement.focus();
      }
    }, delay);

    // Animate the cursor (fake cursor )
    window.setInterval(() => cursorElement.innerText = cursorElement.innerText === '▮' ? '▯' : '▮', 450);
  }
}




//Loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
});
