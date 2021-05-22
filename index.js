const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navLinks = document.getElementsByClassName('navLinks')[0];
const iconsMenu = document.getElementsByClassName('i.left')[0];
const usuarioActual = document.getElementById("usuario");
const mostrarData = document.getElementById("div__mostrar");
const agenda = document.getElementById("link-agenda");
const paciente = document.getElementById("link-paciente");
var pacientex = [];
function formatearFecha(nfecha) {
  var info = nfecha.split('-').reverse().join('/');
  return info;
}

agenda.addEventListener('click', () => {
  document.getElementById("inicio").style.display = "none"
  document.getElementById("myIntro").style.display = "block"
  document.getElementById("myTimeline").style.display = "initial"

});

paciente.addEventListener('click', () => {
  document.getElementById("inicio").style.display = "initial"
  document.getElementById("myIntro").style.display = "none"
  document.getElementById("myTimeline").style.display = "none"

});












window.addEventListener("load", function () {
  let timeLista = document.getElementById("ul-timeline");

  db.collection('users').get()
    .then(snapshot => {

      snapshot.docs.forEach(paciente => {
        let currentID = paciente.id
        let appObj = { ...paciente.data(), ['id']: currentID }
        pacientex.push(appObj)
        // pacientex.push(paciente.data())
      })
    });


  const getCitas = async () => {
    const allcitas = await db.collection('citas')
      .orderBy('fecha', "asc")
      .orderBy('hora', "asc")
      .onSnapshot(querysnapshot => {
        querysnapshot.forEach((doc) => {
          let data = doc.data();

          const found = pacientex.find(p => p.id === data.paciente);
          console.log("Found==>:", found.nombre, found.id);

          let fila = `<li><div> <button style="display: block" class="btn-eliminar-cita">X</button><time>Dia: ${formatearFecha(data.fecha)}
           Hora: ${data.hora}</time><time>Paciente: ${found.nombre} ${found.apellido} </time>
           Mensaje: ${data.msg} 
          
           </div></li>`
          timeLista.innerHTML += fila
        })
      });
  }
  getCitas();
});



auth.onAuthStateChanged(async (user) => {

  if (user) {
    usuarioActual.innerHTML = 'hola: ' + user.email;
    document.getElementById("loginId").style.display = "none";
    document.getElementById("logout").style.display = "block";

    document.querySelectorAll("i.left").forEach((icon) => {
      icon.style.color = "rgb(4, 167, 167)";
    })

    document.querySelectorAll(".menu").forEach((elemento) => {
      elemento.style.pointerEvents = "all";
      elemento.style.color = "black";

    })

    /*  const datos = async () => {
         const snopshot = await db.collection("users")
             .doc(user.uid)
             .get();
         snopshot.data().forEach((e) => {
             console.log("cada for each", e.bio);
         });
     }
     datos(); */
  } else {
    document.querySelectorAll(".menu").forEach((elemento) => {
      elemento.style.pointerEvents = "none";
      elemento.style.color = "rgb(194, 189, 189)";
    })
    document.querySelectorAll("i.left").forEach((icon) => {
      icon.style.pointerEvents = "none";
      icon.style.color = "rgb(194, 189, 189)";
    })
  }
})


toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');

})


/* window.addEventListener('click',(e)=>{

e.preventDefault();
console.log("Clicked on: ",e.target);
}) */