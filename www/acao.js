//funçao cadastrar
$(document).on('submit','#cadastros',function(e) {
	var url = 'https://maestoques.profrodolfo.com.br/sombra-facil/';
	$.ajax({
		url: url+'cadastrar.php',
		data:$(this).serialize(),
		type:'POST',
		success: function(retorno){
			//navigator.notification.alert(retorno, alertCallback, 'Aviso!');
      //alert(retorno);
      
			$('#nome').val("");
			$('#login').val("");
			$('#senha').val("");
			$('#rg').val("");
			$('#telefone').val("");
      $(".modal-body").html(retorno);
      $("#alerta").modal("show");
      //redirecionar('index.html');
		}
	});
	//enviar o form sem atualizar a pagina
	e.preventDefault();


});
// funcao redirecionar
function redirecionar(pagina){
window.location = pagina;

};
//funcao cadastrar localizao
$(document).on('submit','#adicionar',function(e) {
  var url = 'https://maestoques.profrodolfo.com.br/sombra-facil/';

	$.ajax({
		url: url+'addlocal.php',
		data:$(this).serialize(),
		type:'POST',
		success: function(retorno){
			//navigator.notification.alert(retorno, alertCallback, 'Aviso!');
      //alert(retorno);
      $("#nomelocal").val("");
			$('#lat').val("");
			$('#long').val("");
      $(".modal-body").html(retorno);
      $("#alerta").modal("show");
		}
	});

	e.preventDefault();

});

//funçao login
function alertCallback (){};
$(document).on('submit','#logar',function(e) {
  var url = 'https://maestoques.profrodolfo.com.br/sombra-facil/';

	$.ajax({
		url: url+'login.php',
		data:$(this).serialize(),
		type:'POST',
    success: function(retorno){
      //navigator.notification.alert(retorno, alertCallback, 'Login!');
      //alert(retorno);

        $('#login').val("");
        $('#senha').val("");
        var user = JSON.parse(retorno);
        
        if(user.correto){
          localStorage.setItem('cd', user.cd_usuario);
          localStorage.setItem('nome', user.nm_usuario);
          localStorage.setItem('login', user.login);
          localStorage.setItem('senha', user.senha);
          localStorage.setItem('nivel', user.nivel);
          localStorage.setItem('rg_usuario', user.rg_usuario);
          localStorage.setItem('telefone', user.telefone);

          if(user.nivel == ""){
            window.location.href = 'pagina.html';
          }else{
            window.location.href = 'paginaadm.html';
          }
        }else{
          $(".modal-body").html("Usuario ou senha invalidos");
          $("#alerta").modal("show");
        }
      }
	});

	e.preventDefault();

});
$(document).on('click','#pegarlocal',function(e) {
    var onSuccess = function(position) {
    	$('#lat').val(position.coords.latitude);
			$('#long').val(position.coords.longitude);
    };
    var onError = function(){};
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});

function pegardados() {
    $('#nomem').val(user.nm_usuario);
    $('#loginm').val(user.login);
    $('#senham').val(user.senha);
    $('#telefonem').val(user.telefone);
    $('#rgm').val(user.rg_usuario);        
};

