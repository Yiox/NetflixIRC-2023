globalThis.temp = document.getElementById("template");

function isEmail(EmailVal) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(EmailVal);
}

function toggle(id) {
  var x = document.getElementById(id);
  i = id.slice(1)
  var y = document.getElementById('ans'+i);
  
  x.classList.toggle('rotate');
  y.classList.toggle('closed');
}

function remplir_faq(){

  let db;
  let request = new XMLHttpRequest();
  request.open("GET", "faq.json", false);
  request.send();
  db = JSON.parse(request.responseText);

  for (let i = 0; i < 5; i++) {

    let clone = document.importNode(temp.content, true);

    console.log(i," ",db[i].question," ",db[i].reponse);

    newContent = clone.firstElementChild.innerHTML
                .replace(/{{question}}/g, db[i].question)
                .replace(/{{reponse}}/g, db[i].reponse)
                .replace(/{{id}}/g, i)
                .replace(/{{q_id}}/g, i)
                .replace(/{{ans_id}}/g, i);
      clone.firstElementChild.innerHTML = newContent;
      document.getElementById("questions").appendChild(clone);
  }

}

function valider_email(){
  inputEmail= document.getElementsByTagName("input")[0].value;
  if (!isEmail(inputEmail)){alert("🛑 Veuillez entrer une adresse email valide.")}
}

remplir_faq();