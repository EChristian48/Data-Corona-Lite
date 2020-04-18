function parseGlobal(jsonString, object) {
  let data = JSON.parse(jsonString);

  object.innerText = `${data.name} : ${data.value}`;
}

function parseIndonesia(jsonString, object) {
  let data = JSON.parse(jsonString)[0];

  object.innerHTML += `<li>Positif : ${data.positif}</li>`;
  object.innerHTML += `<li>Sembuh : ${data.sembuh}</li>`;
  object.innerHTML += `<li>Meninggal : ${data.meninggal}</li>`;
}

function parseNegara(jsonString, article) {
  let data = JSON.parse(jsonString);

  // Array Semua Negara
  for (let objects of data) {

    let div = document.createElement("div");
    let ul = document.createElement("ul");
  
    div.className = "negara";
    div.appendChild(ul);

    // Wrapper data per negara
    for (let object of Object.values(objects)) {
      // Property tiap negara
      for (let [property, value] of Object.entries(object)) {

        if (property == "Country_Region" || property == "Confirmed" || property == "Deaths" || property == "Recovered" || property == "Active") {

          switch (property) {
            case "Country_Region":
              ul.innerHTML += `<li>Negara : ${value}</li>`;
              div.id = value;
              break;
            case "Confirmed":
              ul.innerHTML += `<li>Total Kasus : ${value}</li>`;
              break;
            case "Deaths":
              ul.innerHTML += `<li>Meninggal : ${value}</li>`;
              break;
            case "Recovered":
              ul.innerHTML += `<li>Sembuh : ${value}</li>`;
              break;
            case "Active":
              ul.innerHTML += `<li>Kasus Aktif : ${value}</li>`;
              break;
            default:
              ul.innerHTML += `<li>${property} : ${value}</li>`;
              break;
          }
        }
      }
    }
    article.appendChild(div);
    article.innerHTML += "<br>";
  }
  inputCari = document.getElementById("textCari");

  inputCari.addEventListener("keydown", function() {
    let arrNegara = document.getElementsByClassName("negara");
  
    for (let negara of arrNegara) {
      if (negara.id.includes(inputCari.value)) {
        article.insertBefore(negara, arrNegara[0]);
      }
    }
  })
}

function getData(url, callback, object) {
  let request = new XMLHttpRequest();

  request.open("get", url, true)
  request.send();

  let msg = document.createElement("div");
  msg.id = "loading";
  msg.innerText = "Mengambil Data..."

  object.appendChild(msg);

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      object.removeChild(msg);
      callback(request.responseText, object);
    } else if (request.readyState == 4 && request.status != 200) {
      msg.innerText = "Gagal Mengambil Data"
    } else {
      msg.innerText = "Mengambil Data..."
    }
  }
}

getData("https://api.kawalcorona.com/positif/", parseGlobal, document.getElementById("totalPositif"));
getData("https://api.kawalcorona.com/sembuh/", parseGlobal, document.getElementById("totalSembuh"));
getData("https://api.kawalcorona.com/meninggal/", parseGlobal, document.getElementById("totalMeninggal"));
getData("https://api.kawalcorona.com/indonesia/", parseIndonesia, document.getElementById("dataIndonesia"));
getData("https://api.kawalcorona.com/", parseNegara, document.getElementById("cari"));

var inputCari = document.getElementById("textCari");