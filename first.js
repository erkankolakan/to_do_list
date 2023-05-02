const icerik = document.querySelector(".order_content");
const btn = document.querySelector(".container_giris input[type='button']");
const gelen_text = document.querySelector(".container_giris input[type='text']");
const gorevler = document.querySelector(".gorevler");


let gorev = gelen_text.value.trim();
let index = 0 ;





    btn.addEventListener("click", () => {

        
icerik : (icerik.insertAdjacentHTML("beforeend", `<li class="gorevler"> <div> <input id="${index}" onclick="tamam(this)" type="checkbox"> </div> <label for="${index}">
        ${gelen_text.value.trim()} </label>  <div> <i class="fa-solid fa-pen"></i> </div> </li> ` )),
    index++

    } ) 


    let tamam = (checkbox) => {
        const liElement = checkbox.parentNode.parentNode;
        if (checkbox.checked) {
          liElement.classList.add("onayladi");
        } else {
          liElement.classList.remove("onayladi");
       
        }
      }
      

    
  

      
    
    