const usuarios = [
    { id: 1, nome: "samuel", tipo: "funcionario", senha: "123", areas: ["producao", "almoxarifado"] },
    { id: 2, nome: "Maria Oliveira", tipo: "gerente", senha: "gerente456", areas: ["producao", "almoxarifado", "rh"] },
    { id: 3, nome: "Pedro Santos", tipo: "administrador", senha: "sam123", areas: ["todas"] },
  ];
  
  const recursos = [
    { id: 1, tipo: "equipamento", nome: "Máquina de Solda", descricao: "Solda MIG", localizacao: "Fábrica - Área de Soldagem" },
    { id: 2, tipo: "veiculo", nome: "Caminhão", placa: "ABC-1234", motorista: "José da Silva", localizacao: "Pátio" },
    { id: 3, tipo: "dispositivo", nome: "Sensor de Movimento", descricao: "Sensor infravermelho", localizacao: "Entrada Principal" }
  ];
  
  // Funções de Autenticação e Autorização
  
  function autenticarUsuario(login, senha) {
    const usuario = usuarios.find(u => u.nome.toLowerCase() === login.toLowerCase() && u.senha === senha);
    return usuario || null;
  }
  
  function autorizarAcesso(usuario, area) {
    if (usuario.tipo === "administrador" || usuario.areas.includes("todas") || usuario.areas.includes(area)) {
      return true;
    }
    return false;
  }
  
  // Funções de Gestão de Recursos
  
  function adicionarRecurso(tipo, nome, descricao, localizacao) {
    const novoRecurso = {
      id: recursos.length + 1,
      tipo: tipo,
      nome: nome,
      descricao: descricao,
      localizacao: localizacao
    };
    recursos.push(novoRecurso);
    console.log("Recurso adicionado:", novoRecurso);
  }
  
  function removerRecurso(id) {
    const indice = recursos.findIndex(r => r.id === id);
    if (indice !== -1) {
      recursos.splice(indice, 1);
      console.log("Recurso removido:", id);
    } else {
      console.log("Recurso não encontrado:", id);
    }
  }
  
  function atualizarRecurso(id, tipo, nome, descricao, localizacao) {
    const recurso = recursos.find(r => r.id === id);
    if (recurso) {
      recurso.tipo = tipo;
      recurso.nome = nome;
      recurso.descricao = descricao;
      recurso.localizacao = localizacao;
      console.log("Recurso atualizado:", recurso);
    } else {
      console.log("Recurso não encontrado:", id);
    }
  }
  
  // Funções de Dashboard
  
  function gerarEstatisticas() {
    const totalRecursos = recursos.length;
    const totalFuncionarios = usuarios.filter(u => u.tipo === "funcionario").length;
    return { totalRecursos, totalFuncionarios };
  }
  
  function exibirDashboard() {
    const estatisticas = gerarEstatisticas();
    console.log("Dashboard:");
    console.log("Total de Recursos:", estatisticas.totalRecursos);
    console.log("Total de Funcionários:", estatisticas.totalFuncionarios);
  }
  
  // Exemplo de uso
  
  const usuarioLogado = autenticarUsuario("Maria Oliveira", "gerente456");
  
  if (usuarioLogado) {
    console.log("Usuário autenticado:", usuarioLogado.nome);
  
    if (autorizarAcesso(usuarioLogado, "producao")) {
      console.log("Acesso autorizado à área de produção.");
    } else {
      console.log("Acesso negado à área de produção.");
    }
  
    // Gerenciamento de Recursos (apenas para administradores)
    if (usuarioLogado.tipo === "administrador") {
      adicionarRecurso("equipamento", "Nova Máquina", "Prensa Hidráulica", "Fábrica - Área de Prensagem");
      removerRecurso(1);
      atualizarRecurso(2, "veiculo", "Caminhão", "Caminhão Baú", "Pátio");
    }
  
    // Exibir Dashboard
    exibirDashboard();
  } else {
    console.log("Autenticação falhou.");
  }
  
  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-button');
  
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Faz requisição para o backend (Flask)
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    })
    .then(data => {
      // Se o login for bem-sucedido, redirecionar para o dashboard
      // ou atualizar a interface para a área do usuário
      console.log('Login bem-sucedido:', data);
      // ...
    })
    .catch(error => {
      // Exibir mensagem de erro
      console.error('Erro de login:', error);
      // ...
    });
  });