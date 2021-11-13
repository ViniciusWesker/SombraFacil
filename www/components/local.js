// This is a JavaScript file
  function mostramapa(lat,long){
    L.mapquest.key = 'M6YEjAkLxl4ShevHouHFp02pyEOSHm6A';

      var map = L.mapquest.map('map', {
        center: [lat, long],
        layers: L.mapquest.tileLayer('map'),
        zoom:16
        
      });
      L.marker([lat, long],{
          icon: L.mapquest.icons.marker(),
          draggable: false
        }).bindPopup('Você está aqui!').addTo(map);
     $.ajax({
       url:'https://maestoques.profrodolfo.com.br/sombra-facil/listarlocal.php',
       type:'get',
       data: null,
       success:function(data){
         var pos = JSON.parse(data);
         var x = pos.length;
         for(var i = 0; i<x;i++){ 
       L.marker([pos[i].latitude, pos[i].longitude],{
          icon: L.mapquest.icons.marker(),
          draggable: false
        }).bindPopup(pos[i].nome_posto+ '<br>'+pos[i].tipo_produto+ ' disponivel:'+pos[i].quantidade+ '<br><b class="rota" lat="'+pos[i].latitude+'" lon="'+pos[i].longitude+'"><u>Clique aqui para mostrar o caminho</u></b>').addTo(map);
        }
       }
     });

     /*
    -------------------------------------Tentando melhorar a exibição de produtos no posto---------------------------------------

      L.marker([lat, long],{
          icon: L.mapquest.icons.marker(),
          draggable: false
        }).bindPopup('Voce esta aqui!').addTo(map);
     $.ajax({
       url:'https://maestoques.profrodolfo.com.br/sombra-facil/listarlocal.php',
       type:'get',
       data: null,
       success:function(data){
         var pos = JSON.parse(data);
         var x = pos.length;
         for(var i = 0; i<x;i++){ 
           $.ajax({
              url:'https://maestoques.profrodolfo.com.br/sombra-facil/listarlocal.php',
              type:{'posto': pos[i].cd_localizacao},
              data: null,
              success:function(data){
                var po = JSON.parse(data);
                var x = po.length;

// L.marker([pos[i].latitude, pos[i].longitude],{
//       icon: L.mapquest.icons.marker(),
//       draggable: false
//     }).bindPopup(pos[i].nome_posto+ '<br>'+po[i].tipo_produto+ ' disponivel:'+po[i].quantidade+ '<br><b class="rota" lat="'+pos[i].latitude+'" lon="'+pos[i].longitude+'"> Ir até lá</b>').addTo(map);          

                  fhfh
                  var txt='';
                  txt+= pos[i].nome_posto+ '<br>';
                for(var i = 0; i<x;i++){ 
                        txt+=po[i].tipo_produto+ ' disponivel:'+po[i].quantidade+ '<br>';          
                }
                txt+='<b class="rota" lat="'+pos[i].latitude+'" lon="'+pos[i].longitude+'"> Ir até lá</b>';
                L.marker([pos[i].latitude, pos[i].longitude],{
                      icon: L.mapquest.icons.marker(),
                      draggable: false
                    }).bindPopup(txt).addTo(map);          
                    console.log(txt);
              }
           });
        }
       }
     });
*/

        //________________________________________rotas_____________________________________________________________________________________
        $(document).on('click', '.rota',function(){
          var a = $(this).attr('lat');
          var b = $(this).attr('lon');

        var directions = L.mapquest.directions();
          directions.route({
            start: [lat,long],
            end: [a, b]
          });
      
      var dir = MQ.routing.directions();

      dir.route({
        locations:[
          'itanhaem, SP',
          'santos,SP'
        ]


      });
      CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        creteStartMarker: (location) =>{
          var custon_icon;
          var marker;

          custon_icon = L.icon({
            icon_Url: 'https://assets.mapquestapi.com/icon/v2/marker@2x.png',
            iconSize:[20,29],
            iconAnchor:[10,29],
            popupAnchor:[0,-29]
          });
          Marker = L.Marker(location.latLng,{icon: custom_icon}.addTo(map));
          return marker;
        },
          creteEndMarker: (location) =>{
          var custon_icon;
          var marker;

          custon_icon = L.icon({
            icon_Url: 'https://assets.mapquestapi.com/icon/v2/marker@2x.png',
            iconSize:[20,29],
            iconAnchor:[10,29],
            popupAnchor:[0,-29]
          });
          Marker = L.Marker(location.latLng,{icon: custom_icon}.addTo(map));
          return marker;
        }

      });
      map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
      }));
      var ten = 0;
      ten = ten+1;
        });
      //________________________________________rotas-final______________________________________________________________________
  }

function cordenatas(){



    var onSuccess = function(position) {
        mostramapa(position.coords.latitude,position.coords.longitude)

    };
 

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' + 
              'message: ' + error.message + '\n');
              document.getElementById('ero').innerHTML = 'ERRO!! REINICIE O APP';
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    cordenatas();