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

let gorevler_dizisi = JSON.parse(localStorage.getItem("todos"))


let goreKontrol = (x) =>{
  if(x.length == 0){
    icerik.insertAdjacentHTML(
      "beforeend",
      `<li class="silinecek gorevler"   >
          <label for="99" > Yapılması Gereken Bir Görev Yok </label>
        </li>`
    );

  }
  if(x.length==1){
    let elma = document.querySelector(".silinecek")
    elma.remove()
  }
}
goreKontrol(gorevler_dizisi)



btn.addEventListener("click", (event) => {
  
  event.preventDefault();
  let yeni_gorev = {
    text: gelen_text.value.trim(),
    checked: false,
    index: index++,
  };

  gorevler_dizisi.push(yeni_gorev);

  
  ekrana_yazdir(gorevler_dizisi);
  
  gelen_text.value="";
});

let ekrana_yazdir = (gorevler_dizisi) => {
  localStorage.setItem("todos",JSON.stringify(gorevler_dizisi))
/*   if(yeni_gorev.text==""){
    alert("Her Hangi Bir Görev Girmeniz Gerekli")

  }
  else{ */
     goreKontrol(gorevler_dizisi)
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
let gorev = gelen_text.value.trim();
let index = 0 ;



    /*Silme Butonu*/
    let sil = (icon) => {
      const liElement = icon.parentNode.parentNode.parentNode;
      liElement.remove(); // öğeyi silmek için remove() yöntemini kullanın
      for (let x in gorevler_dizisi) {
        if (gorevler_dizisi[x].index == icon.id) {
          gorevler_dizisi.splice(x, 1);
          break; // öğe bulunduğunda döngüden çıkın


        }
      }
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

      
      






