const icerik = document.querySelector(".order_content");
const btn = document.querySelector(".container_giris input[type='submit']");
const gelen_text = document.querySelector(".container_giris input[type='text']");
const gorevler = document.querySelector(".gorevler");
const kova = document.querySelector(".icon_kapsayici div:first-child");
const kalem = document.querySelector(".icon_kapsayici div:last-child");
const yuklenme_ekrani = document.querySelector(".yuklenme_ekrani");
const container = document.querySelector("#container");


document.addEventListener("DOMContentLoaded", function() {
    container.classList.add("yuklenme_ekrani")
  
});


var gorevler_dizisi = JSON.parse(localStorage.getItem("todos")) != null ? JSON.parse(localStorage.getItem("todos")) : []

var faruk = () => {
  if(gorevler_dizisi.length==0){
    icerik.insertAdjacentHTML(
      "beforeend",
      `<li class="gorevler">
          <label> Yapılacak Bir Değer Yok </label>
        </li>`)
  }
}
faruk();


var ekrana_yazdir = (gorevler_dizisi) => {
  
      for(var x=0;x<gorevler_dizisi.length;x++)
      {       
         icerik.insertAdjacentHTML(
      "beforeend",
      `<li class="gorevler">
          <div>
            <input id="${gorevler_dizisi[x].index}" onclick="tamam(this)" type="checkbox">
          </div>
          <label for="${gorevler_dizisi[x].index}"> ${gorevler_dizisi[x].text} </label>
          <div class="icon_kapsayici">
            <div>
              <i onclick="sil(this)" id="${gorevler_dizisi[x].index}" class="fa-solid fa-trash"></i>
            </div>
            <div>
              <i onclick="duzenle(this)" id="${gorevler_dizisi[x].index}" class="fa-solid fa-pen"></i>
            </div>
          </div>
        </li>`
    );
  }
};

ekrana_yazdir(gorevler_dizisi)


btn.addEventListener("click", (event) => {
  icerik.innerHTML = '<div></div>';
  event.preventDefault();
  var yeni_gorev = {
    text: gelen_text.value.trim(),
    checked: false,
    index: index++,
  };

  if(yeni_gorev.text ==""){
    alert("Bir Görev Girmelisiniz")
  }
  else{
  gorevler_dizisi.push(yeni_gorev);
  }
  localStorage.setItem("todos",JSON.stringify(gorevler_dizisi))
  ekrana_yazdir(gorevler_dizisi);
  gelen_text.value="";
  
});

let gorev = gelen_text.value.trim();
let index = 0 ;

    /*Silme Butonu*/
    let sil = (icon) => {
      const liElement = icon.parentNode.parentNode.parentNode;
      liElement.remove(); // öğeyi silmek için remove() yöntemini kullanın
      for (let x in gorevler_dizisi) {
        if (gorevler_dizisi[x].index == icon.id) {
          gorevler_dizisi.splice(x, 1);
          localStorage.setItem("todos",JSON.stringify(gorevler_dizisi))
          break; // öğe bulunduğunda döngüden çıkın
        }
      }
      faruk();
    }

    let tamam = (checkbox) => {
        const liElement = checkbox.parentNode.parentNode;
        if (checkbox.checked) {
          liElement.classList.add("onayladi");
        } else {
          liElement.classList.remove("onayladi");
        }
      }

      let duzenle = (gelen) => {
  const liElement = gelen.parentNode.parentNode.parentNode;
  const labelElement = liElement.querySelector("label");
  const labelText = labelElement.textContent.trim();
  gelen_text.value = labelText; // input text'e mevcut label içeriğini ata
  gelen_text.focus();

  // butona tıklandığında yapılacak işlemler
  const btnSave = document.createElement("button");
  btnSave.textContent = "Kaydet";
  btnSave.addEventListener("click", (event) => {
    event.preventDefault();
    const yeniGorev = gelen_text.value.trim();
    if (yeniGorev !== "") {
      labelElement.textContent = yeniGorev; // label içeriğini güncelle
      for (let i = 0; i < gorevler_dizisi.length; i++) {
        if (gorevler_dizisi[i].index == gelen.id) {
          gorevler_dizisi[i].text = yeniGorev; // gorevler dizisindeki ilgili öğenin text değerini güncelle
          break;
        }
      }
    }
    gelen_text.value = "";
    liElement.removeChild(btnSave); // butonu kaldır
  });

  liElement.appendChild(btnSave); // butonu ekle
};

      
      





